export async function up(queryInterface) {
  await queryInterface.sequelize.query(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  `);
}

export async function down(queryInterface) {
  await queryInterface.sequelize.query(`
    DROP EXTENSION IF EXISTS pgcrypto;
  `);
}
