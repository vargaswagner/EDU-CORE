import { env } from "./env.config.js";

export const databaseConfig = {
  dialect: env.DB_DIALECT,

  host: env.DB_HOST,

  port: env.DB_PORT,

  database: env.DB_NAME,

  username: env.DB_USER,

  password: env.DB_PASSWORD,

  logging: env.DB_LOGGING,

  pool: {
    min: env.DB_POOL_MIN,

    max: env.DB_POOL_MAX,

    acquire: env.DB_CONNECTION_TIMEOUT,

    idle: 10000,
  },

  define: {
    timestamps: true,

    underscored: true,

    freezeTableName: true,

    paranoid: true,
  },

  dialectOptions: {
    application_name: env.APP_NAME,
  },
};
