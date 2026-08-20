export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('cronogramas_pago', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    matricula_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'matriculas',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    codigo: {
      type: Sequelize.STRING(40),
      allowNull: false,
    },

    fecha_generacion: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    total: {
      type: Sequelize.DECIMAL(12, 2),
      allowNull: false,
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'GENERADO',
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

  await queryInterface.addConstraint('cronogramas_pago', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_cronogramas_codigo',
  });

  await queryInterface.addConstraint('cronogramas_pago', {
    fields: ['matricula_id'],
    type: 'unique',
    name: 'uq_cronograma_matricula',
  });

  await queryInterface.addConstraint('cronogramas_pago', {
    fields: ['total'],
    type: 'check',
    where: {
      total: {
        [Sequelize.Op.gte]: 0,
      },
    },
    name: 'chk_cronograma_total',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('cronogramas_pago');
}
