import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteSnackService } from "../factories/make-delete-snack-service";

export async function destroy(request: FastifyRequest, reply: FastifyReply) {
  const getSnackSchemaParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = getSnackSchemaParams.parse(request.params);

  try {
    const deleteSnackService = makeDeleteSnackService();

    await deleteSnackService.execute({
      id,
      userId: request.user.sub,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
