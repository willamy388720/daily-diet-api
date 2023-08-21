import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }
}
