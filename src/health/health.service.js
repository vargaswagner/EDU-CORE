import { appConfig } from "../config/index.js";

import { checkDatabaseConnection } from "../shared/infrastructure/database/sequelize/database-health.js";

export async function getHealthStatus() {
  const database = await checkDatabaseConnection();

  const isHealthy = database.status === "up";

  return {
    status: isHealthy ? "ok" : "degraded",

    application: appConfig.name,

    version: appConfig.version,

    environment: appConfig.environment,

    timestamp: new Date().toISOString(),

    uptime: process.uptime(),

    services: {
      database,
    },
  };
}
