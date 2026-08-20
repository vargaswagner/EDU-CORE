export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('ciclos', {
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

    plan_estudios_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'planes_estudios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    numero: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false,
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

  await queryInterface.addConstraint('ciclos', {
    fields: ['codigo'],
    type: 'unique',
    name: 'uq_ciclos_codigo',
  });

  await queryInterface.addConstraint('ciclos', {
    fields: ['plan_estudios_id', 'numero'],
    type: 'unique',
    name: 'uq_ciclos_plan_numero',
  });

  await queryInterface.addConstraint('ciclos', {
    fields: ['numero'],
    type: 'check',
    where: {
      numero: {
        [Sequelize.Op.gt]: 0,
      },
    },
    name: 'chk_ciclos_numero_positivo',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('ciclos');
}
