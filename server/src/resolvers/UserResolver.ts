import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import User from "../models/user/User";
import { PrismaContext } from "../contexts/Prisma.context";
import SignuptInput from "../inputs/SignupInput";
import { compare, hash } from "bcryptjs";
import LoginInput from "../inputs/LoginInput";
import { randomUUID } from "crypto";
import Pagination from "../inputs/Pagination";
import UserOrError from "../models/user/UserOrError";
import Error from "../models/Error";

// Criar tratamento de erros!

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

    @Query(() => UserOrError)
    async userByToken(
        @Arg("token") token: string,
        @Ctx() ctx: PrismaContext
    ): Promise<UserOrError> {
        const DbToken = await ctx.prisma.token.findUnique({
            where: { token },
            include: {
                user: true,
            },
        });

        const userNotFound = new Error("User not found", 401);

        if (!DbToken) {
            return { error: userNotFound };
        }

        const user = DbToken.user;

        return {
            data: {
                ...user,
            },
        };
    }

    @Mutation(() => UserOrError)
    async signup(
        @Arg("data") data: SignuptInput,
        @Ctx() ctx: PrismaContext
    ): Promise<UserOrError> {
        const passwordsDoNotMatch = new Error("Passwords do not match", 401);
        if (data.password !== data.confirmPassword) {
            return { error: passwordsDoNotMatch };
        }

        const encryptedPassword = await hash(data.password, 10);
        const user = await ctx.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: encryptedPassword,
            },
        });

        return {
            data: {
                ...user,
            },
        };
    }

    @Mutation(() => UserOrError)
    async login(
        @Arg("data") data: LoginInput,
        @Ctx() ctx: PrismaContext
    ): Promise<UserOrError> {
        const user = await ctx.prisma.user.findUnique({
            where: { email: data.email },
            include: {
                token: true,
            },
        });

        const userNotFound = new Error("User not found", 401);
        if (!user) return { error: userNotFound };

        const passwordIsValid = compare(data.password, user.password);

        const invalidPassword = new Error("Invalid password", 401);
        if (!passwordIsValid) return { error: invalidPassword };

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

        const userWhithToken = {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token.token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };

        return {
            data: {
                ...userWhithToken,
            },
        };
    }

    @Query(() => Number)
    async userCount(@Ctx() ctx: PrismaContext): Promise<Number> {
        const userCount = await ctx.prisma.user.count();
        return userCount;
    }
}
