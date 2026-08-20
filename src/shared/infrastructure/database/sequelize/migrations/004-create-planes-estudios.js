export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('planes_estudios', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    carrera_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'carreras',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    codigo: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },

    nombre: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },

    version: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },

    fecha_inicio: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },

    fecha_fin: {
      type: Sequelize.DATEONLY,
      allowNull: true,
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

  await queryInterface.addConstraint('planes_estudios', {
    fields: ['carrera_id', 'codigo'],
    type: 'unique',
    name: 'uq_planes_carrera_codigo',
  });

  await queryInterface.addConstraint('planes_estudios', {
    fields: ['fecha_inicio', 'fecha_fin'],
    type: 'check',
    where: {
      [Sequelize.Op.or]: [
        {
          fecha_fin: null,
        },
        Sequelize.literal('fecha_fin >= fecha_inicio'),
      ],
    },
    name: 'chk_plan_fechas_validas',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('planes_estudios');
}
