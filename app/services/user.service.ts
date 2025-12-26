import { prisma } from "../Lib/prisma";

type CreateUserInput = {
    name?: string;
    email: string;
    password: string;
};

export class UserService {
    static async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    static async create(data: CreateUserInput) {
        return prisma.user.create({
            data,
        });
    }
}
