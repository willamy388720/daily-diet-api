import { SnacksRepository } from "@/repositories/snacks-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Snack } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface FetchSnacksUserServiceRequest {
  userId: string;
}

interface FetchSnacksUserServiceResponse {
  snacks: Snack[];
}

export class FetchSnacksUserService {
  constructor(
    private snacksRepository: SnacksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: FetchSnacksUserServiceRequest): Promise<FetchSnacksUserServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const snacks = await this.snacksRepository.findSnacksByUser(userId);

    return { snacks };
  }
}
