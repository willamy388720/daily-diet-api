import { PrismaSnacksRepository } from "@/repositories/prisma/prisma-snacks-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { MetricsService } from "@/services/users/metrics";

export function makeMetricsService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const prismaSnacksRepository = new PrismaSnacksRepository();
  const service = new MetricsService(
    prismaSnacksRepository,
    prismaUsersRepository
  );

  return service;
}
