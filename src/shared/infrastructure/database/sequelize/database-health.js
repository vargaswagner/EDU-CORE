import { sequelize } from "./sequelize.js";

export async function checkDatabaseConnection() {
  try {
    await sequelize.authenticate();

    return {
      status: "up",
    };
  } catch (error) {
    return {
      status: "down",

      error: error.message,
    };
  }
}
