"use client";
import ClientGravatar from "@/components/utilities/ClientGravatar";
import { User } from "@/interfaces/User";
import { gql, useQuery } from "@apollo/client";

function Thead() {
    return (
        <thead>
            <tr>
                <th>Index</th>
                <th>Gravatar</th>
                <th>Name</th>
                <th>E-mail</th>
            </tr>
        </thead>
    );
}

const GET_TABLE_USERS = gql`
    query ($pagination: Pagination!) {
        users(pagination: $pagination) {
            name
            email
        }
    }
`;

function UserTableRows() {
    const { data } = useQuery(GET_TABLE_USERS, {
        variables: {
            pagination: {
                take: 5,
                skip: 0,
            },
        },
    });

    return (
        <>
            {data &&
                data.users.map((user: User, index: number) => {
                    return (
                        <tr key={user.email}>
                            <td>{index}</td>
                            <td>
                                <ClientGravatar email={user.email} />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    );
                })}
        </>
    );
}

export default function UsersTable() {
    return (
        <div>
            <table>
                <Thead />
                <tbody>
                    <UserTableRows />
                </tbody>
            </table>
        </div>
    );
}
