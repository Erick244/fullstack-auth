import "reflect-metadata";
import { prisma } from "./contexts/Prisma.context";
import { ApolloServer } from "apollo-server";
import path from "path";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";

async function main() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
        emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    });

    const server = new ApolloServer({
        schema,
        context: {
            prisma,
        },
    });

	const { url } = await server.listen();

	console.log(`✅ - Server listening on ${url}`);
}

main();
