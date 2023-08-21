import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/users/authenticate";

export function makeAuthenticateService() {
  const prismaUsersRepository = new PrismaUsersRepository();
  const service = new AuthenticateService(prismaUsersRepository);

  return service;
}
