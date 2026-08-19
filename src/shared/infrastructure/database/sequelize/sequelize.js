import { Sequelize } from "sequelize";

import { databaseConfig } from "../../../../config/database.config.js";

import { logger } from "../../../../config/logger.config.js";

export const sequelize = new Sequelize(
  databaseConfig.database,

  databaseConfig.username,

  databaseConfig.password,

  {
    dialect: databaseConfig.dialect,

    host: databaseConfig.host,

    port: databaseConfig.port,

    logging: databaseConfig.logging
      ? (sql) => logger.debug({ sql }, "SQL Query")
      : false,

    pool: databaseConfig.pool,

    define: databaseConfig.define,

    dialectOptions: databaseConfig.dialectOptions,
  },
);
