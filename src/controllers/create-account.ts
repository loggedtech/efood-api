import { FastifyReply, FastifyRequest } from "fastify";

export class CreateAccountController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { address, restaurant, user } = request.body;

    const createAccountService = new CreateAccountService();
    const account = await createAccountService.execute({
      address,
      restaurant,
      user,
    });

    return reply.status(201).send({ account });
  }
}
