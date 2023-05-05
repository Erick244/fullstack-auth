"use client";
import { User } from "@/interfaces/User";
import { gql, useMutation, useQuery } from "@apollo/client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { toast, Id } from "react-toastify";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (data: User) => Promise<Id | undefined>;
    user: User | null;
    loginLoading: boolean;
    logOut: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

const LOGIN_USER = gql`
    mutation ($data: LoginInput!) {
        login(data: $data) {
            data {
                id
                name
                email
                token
                createdAt
                updatedAt
            }
            error {
                message
            }
        }
    }
`;

const USER_BY_TOKEN = gql`
    query ($token: String!) {
        userByToken(token: $token) {
            data {
                id
                name
                email
                createdAt
                updatedAt
            }
            error {
                message
            }
        }
    }
`;

const { "fullstack-auth-token": token } = parseCookies(undefined);

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
	const { push } = useRouter();
    const [loginUser, { loading }] = useMutation(LOGIN_USER);
    const loginLoading = loading;
    const { data } = useQuery(USER_BY_TOKEN, {
        variables: {
            token,
        },
        fetchPolicy: "cache-and-network",
    });

	const logOut = useCallback(() => {
		destroyCookie(undefined, "fullstack-auth-token");
        push("/auth");
	}, [push])
	

    useEffect(() => {
        const userByToken = data?.userByToken.data;
        const userByTokenError = data?.userByToken.error;

        if (userByToken) {
            setUser(userByToken);
        } else if (userByTokenError) {
            toast(userByTokenError.message, {
                type: "error",
                position: "bottom-right",
            });
            logOut();
        }
    }, [data?.userByToken, logOut]);

    async function login(data: User) {
        const userWhithToken = await loginUser({
            variables: {
                data,
            },
        });

		const loginError = userWhithToken.data.login.error;
		if (loginError) return toast(loginError.message, { type: "error" });

        const user = await userWhithToken.data.login.data;
        setUser(user);

        const token = await userWhithToken.data.login.data.token;
        const tokenExpiration = 60 * 60 * 60 * 24 * 7; // 7 days

        setCookie(undefined, "fullstack-auth-token", token, {
            maxAge: tokenExpiration,
        });

        push("/dashboard");
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                user,
                loginLoading,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
