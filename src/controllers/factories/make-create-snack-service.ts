import { PrismaSnacksRepository } from "@/repositories/prisma/prisma-snacks-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateSnackService } from "@/services/snacks/create-snack";

export function makeCreateSnackService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaSnacksRepository = new PrismaSnacksRepository();
  const service = new CreateSnackService(
    prismaSnacksRepository,
    prismaUsersRepository
  );

  return service;
}
