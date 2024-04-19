import { env } from "./config/env";
import { logger } from "./utils/logger";
import { buildServer, gracefulShutdown } from "./utils/server";

async function main() {
  const app = await buildServer();

  app.listen({
    port: env.PORT,
    host: env.HOST,
  });

  const signals = ["SIGINT", "SIGTERM"];

  logger.debug(env, "Environment variables");

  for (const signal of signals) {
    process.on(signal, () => {
      gracefulShutdown({
        app,
      });
    });
  }
}

main();
