import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetSnackService } from "../factories/make-get-snack-service";

export async function getSnack(request: FastifyRequest, reply: FastifyReply) {
  const getSnackSchemaParams = z.object({
    id: z.string().uuid(),
  });

  const { id } = getSnackSchemaParams.parse(request.params);

  try {
    const getSnackUserService = makeGetSnackService();

    const { snack } = await getSnackUserService.execute({
      id,
      userId: request.user.sub,
    });

    return reply.status(200).send({ snack });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
