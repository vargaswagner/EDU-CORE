export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('usuarios_roles', {
    usuario_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    rol_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('NOW'),
    },
  });

  await queryInterface.addConstraint('usuarios_roles', {
    fields: ['usuario_id', 'rol_id'],
    type: 'primary key',
    name: 'pk_usuarios_roles',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('usuarios_roles');
}
