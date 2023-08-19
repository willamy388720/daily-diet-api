import { SnacksRepository } from "@/repositories/snacks-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { Snack } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateSnackServiceRequest {
  id: string;
  userId: string;
  name?: string | null;
  description?: string | null;
  date?: Date | null;
  hour?: string | null;
  isOnDiet?: boolean | null;
}

interface UpdateSnackServiceResponse {
  snack: Snack;
}

export class UpdateSnackService {
  constructor(
    private snacksRepository: SnacksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    id,
    userId,
    name,
    description,
    date,
    hour,
    isOnDiet,
  }: UpdateSnackServiceRequest): Promise<UpdateSnackServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const snack = await this.snacksRepository.findByIdAndUserId(id, userId);

    if (!snack) {
      throw new ResourceNotFoundError();
    }

    snack.name = name ?? snack.name;
    snack.description = description ?? snack.description;
    snack.date = date ?? snack.date;
    snack.hour = hour ?? snack.hour;
    snack.is_on_diet = isOnDiet ?? snack.is_on_diet;

    await this.snacksRepository.save(snack);

    return { snack };
  }
}
