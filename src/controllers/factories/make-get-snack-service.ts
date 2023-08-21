import { PrismaSnacksRepository } from "@/repositories/prisma/prisma-snacks-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetSnackUserService } from "@/services/snacks/get-snack-user";

export function makeGetSnackService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaSnacksRepository = new PrismaSnacksRepository();
  const service = new GetSnackUserService(
    prismaSnacksRepository,
    prismaUsersRepository
  );

  return service;
}
