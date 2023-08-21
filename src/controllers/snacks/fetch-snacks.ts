import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchSnacksService } from "../factories/make-fetch-snacks-service";

export async function fetchSnacks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const fetchSnacksUserService = makeFetchSnacksService();

    const { snacks } = await fetchSnacksUserService.execute({
      userId: request.user.sub,
    });

    return reply.status(200).send({ snacks });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
