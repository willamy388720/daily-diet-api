import { PrismaSnacksRepository } from "@/repositories/prisma/prisma-snacks-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UpdateSnackService } from "@/services/snacks/update-snack";

export function makeUpdateSnackService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaSnacksRepository = new PrismaSnacksRepository();
  const service = new UpdateSnackService(
    prismaSnacksRepository,
    prismaUsersRepository
  );

  return service;
}
