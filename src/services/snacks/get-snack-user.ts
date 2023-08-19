import { SnacksRepository } from "@/repositories/snacks-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Snack } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetSnackUserServiceRequest {
  id: string;
  userId: string;
}

interface GetSnackUserServiceResponse {
  snack: Snack;
}

export class GetSnackUserService {
  constructor(
    private snacksRepository: SnacksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    userId,
  }: GetSnackUserServiceRequest): Promise<GetSnackUserServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const snack = await this.snacksRepository.findByIdAndUserId(id, userId);

    if (!snack) {
      throw new ResourceNotFoundError();
    }

    return { snack };
  }
}
