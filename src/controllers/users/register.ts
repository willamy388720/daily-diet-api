import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterService } from "../factories/make-register-service";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerSchema.parse(request.body);

  try {
    const registerService = makeRegisterService();

    await registerService.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
