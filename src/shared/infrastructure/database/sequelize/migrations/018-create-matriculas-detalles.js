export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('matriculas_detalles', {
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
      onDelete: 'CASCADE',
    },

    seccion_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'secciones',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },

    estado: {
      type: Sequelize.STRING(30),
      allowNull: false,
      defaultValue: 'MATRICULADO',
    },

    fecha_registro: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },

    nota_final: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: true,
    },

    observaciones: {
      type: Sequelize.TEXT,
      allowNull: true,
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

  await queryInterface.addConstraint('matriculas_detalles', {
    fields: ['matricula_id', 'seccion_id'],
    type: 'unique',
    name: 'uq_matricula_seccion',
  });

  await queryInterface.addConstraint('matriculas_detalles', {
    fields: ['nota_final'],
    type: 'check',
    where: Sequelize.literal(
      'nota_final IS NULL OR (nota_final >= 0 AND nota_final <= 20)',
    ),
    name: 'chk_nota_final',
  });

  await queryInterface.addIndex('matriculas_detalles', ['seccion_id'], {
    name: 'idx_matricula_detalle_seccion',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('matriculas_detalles');
}
