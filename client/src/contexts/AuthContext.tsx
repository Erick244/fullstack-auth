"use client";
import { User } from "@/interfaces/User";
import { gql, useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

interface AuthContextProps {
    isAuthenticated: boolean;
    login: (data: User) => Promise<void>;
    user: User | null;
	loginLoading: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

const LOGIN_USER = gql`
    mutation ($data: LoginInput!) {
        login(data: $data) {
            token
            user {
                id
                name
                email
                createdAt
                updatedAt
            }
        }
    }
`;

const USER_BY_TOKEN = gql`
    query ($token: String!) {
        userByToken(token: $token) {
            id
            name
            email
            createdAt
            updatedAt
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

    const { data } = useQuery(USER_BY_TOKEN, {
        variables: {
            token,
        },
        fetchPolicy: "cache-and-network",
    });

    useEffect(() => {
        const userByToken = data?.userByToken;

        if (userByToken) {
            setUser(data.userByToken);
        }
    }, [data?.userByToken]);

    const { push } = useRouter();
    const [loginUser, { loading }] = useMutation(LOGIN_USER);
	const loginLoading = loading;

    async function login(data: User) {
        const userWhithToken = await loginUser({
            variables: {
                data,
            },
        });

        const user = await userWhithToken.data.login.user;
        setUser(user);

        const token = await userWhithToken.data.login.token;
        const tokenExpiration = 60 * 60 * 60 * 24 * 7; // 7 days

        setCookie(undefined, "fullstack-auth-token", token, {
            maxAge: tokenExpiration,
        });

        push("/dashboard");
    }

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, login, user, loginLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
