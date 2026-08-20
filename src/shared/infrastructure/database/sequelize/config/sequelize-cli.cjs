// src/shared/infrastructure/database/sequelize/config/sequelize-cli.cjs

require('dotenv').config();

const common = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  dialect: 'postgres',
};

module.exports = {
  development: {
    ...common,
    logging: console.log,
  },

  test: {
    ...common,
    database: process.env.DB_TEST_NAME || `${process.env.DB_NAME}_test`,
    logging: false,
  },

  production: {
    ...common,
    logging: false,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
