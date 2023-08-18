import { Prisma, Snack } from "@prisma/client";

export interface SnacksRepository {
  create(data: Prisma.SnackUncheckedCreateInput): Promise<Snack>;
}
