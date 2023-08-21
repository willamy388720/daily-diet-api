import { PrismaSnacksRepository } from "@/repositories/prisma/prisma-snacks-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteSnackService } from "@/services/snacks/delete-snack";

export function makeDeleteSnackService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaSnacksRepository = new PrismaSnacksRepository();
  const service = new DeleteSnackService(
    prismaSnacksRepository,
    prismaUsersRepository
  );

  return service;
}
