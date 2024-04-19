import fastify from "fastify";
import { logger } from "./logger";
import cors from "@fastify/cors";

export async function buildServer() {
  const app = fastify({
    logger,
  });

  app.register(cors, {
    origin: "*",
  });

  return app;
}

export async function gracefulShutdown({
  app,
}: {
  app: Awaited<ReturnType<typeof buildServer>>;
}) {
  await app.close();
}
