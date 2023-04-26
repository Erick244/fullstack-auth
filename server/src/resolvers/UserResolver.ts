import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User, UserWhithToken } from "../models/User";
import { PrismaContext } from "../contexts/Prisma.context";
import SignuptInput from "../inputs/SignupInput";
import { compare, hash } from "bcryptjs";
import LoginInput from "../inputs/LoginInput";
import { randomUUID } from "crypto";
import Pagination from "../inputs/Pagination";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async users(
        @Arg("pagination") pagination: Pagination,
        @Ctx() ctx: PrismaContext
    ): Promise<User[]> {
        const { skip, take } = pagination;
        const users = await ctx.prisma.user.findMany({
            skip,
            take,
        });

        return users;
    }

    @Query(() => User, { nullable: true })
    async userByToken(
        @Arg("token") token: string,
        @Ctx() ctx: PrismaContext
    ): Promise<User | null> {
        const DbToken = await ctx.prisma.token.findMany({
            where: { token },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        createdAt: true,
                        updatedAt: true,
                    },
                },
            },
        });

        if (!DbToken) return null;
        const user = DbToken[0].user;

        return user;
    }

    @Mutation(() => User)
    async signup(
        @Arg("data") data: SignuptInput,
        @Ctx() ctx: PrismaContext
    ): Promise<User | null> {
        if (data.password !== data.confirmPassword) return null;

        const encryptedPassword = await hash(data.password, 10);
        const user = await ctx.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: encryptedPassword,
            },
        });
        return user;
    }

    @Mutation(() => UserWhithToken)
    async login(
        @Arg("data") data: LoginInput,
        @Ctx() ctx: PrismaContext
    ): Promise<{ user: User; token: string } | null> {
        const user = await ctx.prisma.user.findUnique({
            where: { email: data.email },
            include: {
                token: true,
            },
        });

        if (!user) return null;

        const passwordIsValid = compare(data.password, user.password);
        if (!passwordIsValid) return null;

        const userTokenId = user.token[0]?.id;
        if (userTokenId) {
            await ctx.prisma.token.delete({
                where: { id: userTokenId },
            });
        }

        const tokenCode = randomUUID();
        const token = await ctx.prisma.token.create({
            data: {
                token: tokenCode,
                user: {
                    connect: { id: user.id },
                },
            },
        });

        const userAndToken = {
            token: token.token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        };

        return userAndToken;
    }
}
