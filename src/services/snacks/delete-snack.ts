import { SnacksRepository } from "@/repositories/snacks-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteSnackServiceRequest {
  id: string;
  userId: string;
}

interface DeleteSnackServiceResponse {}

export class DeleteSnackService {
  constructor(
    private snacksRepository: SnacksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    userId,
  }: DeleteSnackServiceRequest): Promise<DeleteSnackServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const snack = await this.snacksRepository.findById(id);

    if (!snack) {
      throw new ResourceNotFoundError();
    }

    await this.snacksRepository.destroy(snack);

    return {};
  }
}
