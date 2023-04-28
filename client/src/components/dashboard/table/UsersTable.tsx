"use client";
import ClientGravatar from "@/components/utilities/ClientGravatar";
import { paginationSkipAtom } from "@/contexts/Jotai";
import { User } from "@/interfaces/User";
import { gql, useQuery } from "@apollo/client";
import { useAtomValue } from "jotai";

// criar skeletons screens

const classes = {
    table: `
		w-11/12 bg-white shadow-lg
		rounded overflow-hidden
	`,
    thead: `
		text-center text-white
		bg-gradient-to-r from-stone-800 from-15%
		via-purple-800 to-stone-800 to-85%
	`,
    th: `
		p-3 font-normal
	`,
    tr: `
		text-center text-white
		border-b border-purple-500
		bg-stone-800/95
	`,
    gravatarTd: `
		flex justify-center p-2
	`,
    gravatar: `
		rounded-full
		border-2 border-purple-500
	`,
};

type TableElementProps = {
    children: React.ReactNode;
};

function Th({ children }: TableElementProps) {
    return <th className={classes.th}>{children}</th>;
}

function Thead() {
    return (
        <thead className={classes.thead}>
            <tr>
                <Th>Gravatar</Th>
                <Th>Name</Th>
                <Th>E-mail</Th>
            </tr>
        </thead>
    );
}

function GravatarTd({ children }: TableElementProps) {
    return <td className={classes.gravatarTd}>{children}</td>;
}

const GET_USERS_TABLE = gql`
    query ($pagination: Pagination!) {
        users(pagination: $pagination) {
            name
            email
        }
    }
`;

function Tbody() {
    const paginationSkip = useAtomValue(paginationSkipAtom);

    const { data, loading } = useQuery(GET_USERS_TABLE, {
        variables: {
            pagination: {
                take: 5,
                skip: paginationSkip,
            },
        },
    });

    if (loading) {
        return (
            <tbody>
                <tr>
                    <td>Loading...</td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {data &&
                data.users.map((user: User, index: number) => {
                    return (
                        <tr key={user.email} className={classes.tr}>
                            <GravatarTd>
                                <ClientGravatar
                                    email={user.email}
                                    className={classes.gravatar}
                                />
                            </GravatarTd>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    );
                })}
        </tbody>
    );
}

export default function UsersTable() {
    return (
        <table className={classes.table}>
            <Thead />
            <Tbody />
        </table>
    );
}
