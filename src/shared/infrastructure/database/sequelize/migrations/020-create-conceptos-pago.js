export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('conceptos_pago', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    codigo: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    nombre: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    descripcion: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    tipo: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },

    monto_base: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    permite_descuento: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    permite_mora: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    estado: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'ACTIVO',
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  });

  await queryInterface.addConstraint('conceptos_pago', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_conceptos_pago_codigo',
  });

  await queryInterface.addConstraint('conceptos_pago', {
    fields: ['monto_base'],
    type: 'check',
    where: {
      monto_base: {
        [Sequelize.Op.gte]: 0,
      },
    },
    name: 'chk_concepto_monto',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('conceptos_pago');
}
