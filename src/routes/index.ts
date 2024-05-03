import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export async function routes(app: FastifyInstance) {
  app.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    return reply.send({
      message: "Welcome to efood!",
      data: request.body,
    });
  });
}
