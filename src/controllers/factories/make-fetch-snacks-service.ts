import { PrismaSnacksRepository } from "@/repositories/prisma/prisma-snacks-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FetchSnacksUserService } from "@/services/snacks/fetch-snacks-user";

export function makeFetchSnacksService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaSnacksRepository = new PrismaSnacksRepository();
  const service = new FetchSnacksUserService(
    prismaSnacksRepository,
    prismaUsersRepository
  );

  return service;
}
