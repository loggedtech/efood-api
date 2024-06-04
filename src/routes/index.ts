import { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {
  app.get("/", (request, reply) => {
    return reply.send({
      message: "Welcome to efood!",
      data: request.body,
    });
  });
}
