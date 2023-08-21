import { ResourceNotFoundError } from "@/services/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeMetricsService } from "../factories/make-metrics-service";

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  try {
    const metricsService = makeMetricsService();

    const {
      numberOfSnacks,
      numberOfSnacksOnDiet,
      numberOfSnacksOffDiet,
      bestSequelOfSnackOnDiet,
    } = await metricsService.execute({
      userId: request.user.sub,
    });

    return reply
      .status(200)
      .send({
        numberOfSnacks,
        numberOfSnacksOnDiet,
        numberOfSnacksOffDiet,
        bestSequelOfSnackOnDiet,
      });
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message });
    }

    throw error;
  }
}
