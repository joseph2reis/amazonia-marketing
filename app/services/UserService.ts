import { prisma } from "../Lib/prisma";
import { CreateCompanyInput } from "../types/company/company";
import { CreateUserInput } from "../types/user/user";

export class UserService {
    static async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                password: true,
                role: true,
            }
        });
    }

    static async create(data: CreateUserInput) {
        return prisma.user.create({
            data,
        });
    }
}

