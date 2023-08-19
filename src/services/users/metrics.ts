import { SnacksRepository } from "@/repositories/snacks-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface MetricsServiceRequest {
  userId: string;
}

interface MetricsServiceResponse {
  numberOfSnacks: number;
  numberOfSnacksOnDiet: number;
  numberOfSnacksOffDiet: number;
  bestSequelOfSnackOnDiet: number;
}

export class MetricsService {
  constructor(
    private snacksRepository: SnacksRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: MetricsServiceRequest): Promise<MetricsServiceResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const numberOfSnacks = (
      await this.snacksRepository.findSnacksByUser(userId)
    ).length;
    const numberOfSnacksOnDiet = (
      await this.snacksRepository.findByOnDiet(userId, true)
    ).length;
    const numberOfSnacksOffDiet = (
      await this.snacksRepository.findByOnDiet(userId, false)
    ).length;
    const bestSequelOfSnackOnDiet =
      await this.snacksRepository.findByBestSequel(userId);

    return {
      numberOfSnacks,
      numberOfSnacksOnDiet,
      numberOfSnacksOffDiet,
      bestSequelOfSnackOnDiet,
    };
  }
}
