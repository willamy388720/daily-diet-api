import { Prisma, Snack } from "@prisma/client";

export interface SnacksRepository {
  save(snack: Snack): Promise<Snack>;
  findById(id: string): Promise<Snack | null>;
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>;
}
