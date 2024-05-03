import fastify from "fastify";
import { logger } from "./logger";
import cors from "@fastify/cors";
import { routes } from "../routes";

export async function buildServer() {
  const app = fastify({
    logger,
  });

  app.register(cors, {
    origin: "*",
  });

  app.register(routes);

  return app;
}

export async function gracefulShutdown({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
}
