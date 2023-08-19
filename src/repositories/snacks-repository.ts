import { Prisma, Snack } from "@prisma/client";

export interface SnacksRepository {
  findSnacksByUser(userId: string): Promise<Snack[]>;
  destroy(snack: Snack): Promise<void>;
  save(snack: Snack): Promise<Snack>;
  findByIdAndUserId(id: string, userId: string): Promise<Snack | null>;
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>;
}
