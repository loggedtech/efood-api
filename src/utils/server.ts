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

export interface AppServer {
  app: Awaited<ReturnType<typeof buildServer>>;
}

export async function gracefulShutdown({ app }: AppServer) {
  await app.close();
}
