export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('roles_permisos', {
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

    permiso_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'permisos',
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

  await queryInterface.addConstraint('roles_permisos', {
    fields: ['rol_id', 'permiso_id'],
    type: 'primary key',
    name: 'pk_roles_permisos',
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable('roles_permisos');
}
