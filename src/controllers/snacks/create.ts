import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { makeCreateSnackService } from "../factories/make-create-snack-service";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSchema = z.object({
    name: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    hour: z.string(),
    isOnDiet: z.boolean(),
  });

  const { name, description, date, hour, isOnDiet } = createSchema.parse(
    request.body
  );

  try {
    const createSnackService = makeCreateSnackService();

    const { snack } = await createSnackService.execute({
      userId: request.user.sub,
      name,
      description,
      date,
      hour,
      isOnDiet,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
