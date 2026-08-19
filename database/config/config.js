import { env } from "../../src/config/env.config.js";

const baseConfig = {
  dialect: "postgres",

  host: env.DB_HOST,

  port: env.DB_PORT,

  username: env.DB_USER,

  password: env.DB_PASSWORD,

  database: env.DB_NAME,

  logging: false,

  define: {
    timestamps: true,

    underscored: true,

    freezeTableName: true,

    paranoid: true,
  },
};

export default {
  development: {
    ...baseConfig,
  },

  test: {
    ...baseConfig,

    database: `${env.DB_NAME}_test`,
  },

  production: {
    ...baseConfig,

    logging: false,
  },
};
