export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('personas', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },

    tipo_documento: {
      type: Sequelize.STRING(20),
      allowNull: false,
      defaultValue: 'DNI',
    },

    numero_documento: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true,
    },

    nombres: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    apellido_paterno: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },

    apellido_materno: {
      type: Sequelize.STRING(100),
      allowNull: true,
    },

    fecha_nacimiento: {
      type: Sequelize.DATEONLY,
      allowNull: true,
    },

    telefono: {
      type: Sequelize.STRING(20),
      allowNull: true,
    },

    email: {
      type: Sequelize.STRING(150),
      allowNull: true,
    },

    direccion: {
      type: Sequelize.STRING(250),
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

  await queryInterface.addIndex('personas', ['numero_documento'], {
    unique: true,
    name: 'uq_personas_numero_documento',
  });

  await queryInterface.addIndex('personas', ['email'], {
    name: 'idx_personas_email',
  });

  await queryInterface.addIndex('personas', ['estado'], {
    name: 'idx_personas_estado',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('personas');
}
