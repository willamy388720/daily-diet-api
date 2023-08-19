import { Prisma, Snack } from "@prisma/client";

export interface SnacksRepository {
  findByBestSequel(userId: string): Promise<number>;
  findByOnDiet(userId: string, onDiet: boolean): Promise<Snack[]>;
  findSnacksByUser(userId: string): Promise<Snack[]>;
  destroy(snack: Snack): Promise<void>;
  save(snack: Snack): Promise<Snack>;
  findByIdAndUserId(id: string, userId: string): Promise<Snack | null>;
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>;
}
