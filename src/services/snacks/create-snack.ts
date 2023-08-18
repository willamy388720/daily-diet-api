import { SnacksRepository } from "@/repositories/snacks-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Snack } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface CreateSnackServiceRequest {
  userId: string;
  name: string;
  description: string;
  date: Date;
  hour: string;
  isOnDiet: boolean;
}

interface CreateSnackServiceResponse {
  snack: Snack;
}

export class CreateSnackService {
  constructor(
    private snacksRepository: SnacksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    name,
    description,
    date,
    hour,
    isOnDiet,
  }: CreateSnackServiceRequest): Promise<CreateSnackServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const snack = await this.snacksRepository.create({
      user_id: userId,
      name,
      description,
      date,
      hour,
      is_on_diet: isOnDiet,
    });

    return { snack };
  }
}
