import { appConfig, serverConfig, logger } from "./config/index.js";

import { app } from "./app.js";

import { sequelize } from "./shared/infrastructure/database/sequelize/sequelize.js";

async function bootstrap() {
  try {
    await sequelize.authenticate();

    logger.info("Database connection established");

    const server = app.listen(serverConfig.port, serverConfig.host, () => {
      logger.info(
        {
          application: appConfig.name,

          version: appConfig.version,

          environment: appConfig.environment,

          host: serverConfig.host,

          port: serverConfig.port,
        },
        "HTTP server started",
      );
    });

    const gracefulShutdown = async (signal) => {
      logger.info({ signal }, "Graceful shutdown started");

      server.close(async () => {
        try {
          await sequelize.close();

          logger.info("Database connection closed");

          logger.info("HTTP server closed");

          process.exit(0);
        } catch (error) {
          logger.error(error, "Shutdown error");

          process.exit(1);
        }
      });
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    logger.fatal(error, "Application bootstrap failed");

    process.exit(1);
  }
}

process.on("uncaughtException", (error) => {
  logger.fatal(error, "Uncaught exception");

  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.fatal(error, "Unhandled promise rejection");

  process.exit(1);
});

bootstrap();
