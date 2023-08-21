import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdateSnackService } from "../factories/make-update-snack-service";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateSchema = z.object({
    name: z.string().nullable().default(null),
    description: z.string().nullable().default(null),
    date: z.coerce.date().nullable().default(null),
    hour: z.string().nullable().default(null),
    isOnDiet: z.boolean().nullable().default(null),
  });

  const updateSchemaParams = z.object({
    id: z.string().uuid(),
  });

  const { name, description, date, hour, isOnDiet } = updateSchema.parse(
    request.body
  );

  const { id } = updateSchemaParams.parse(request.params);

  try {
    const updateSnackService = makeUpdateSnackService();

    await updateSnackService.execute({
      id,
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
