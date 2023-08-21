import { InvalidCredentialsError } from "@/services/errors/invalid-credententials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateService } from "../factories/make-authenticate-service";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateSchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateService();

    const { user } = await authenticateService.execute({ email, password });

    const token = await reply.jwtSign({}, { sub: user.id });

    return reply.status(200).send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: error.message });
    }
    throw error;
  }
}
