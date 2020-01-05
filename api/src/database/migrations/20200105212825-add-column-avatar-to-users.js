module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'avatar_id', {
      after: 'provider',
      type: Sequelize.INTEGER,
      references: {
        model: 'files',
        key: 'id',
      },
      allowNull: true,
      onUpdate: 'cascade',
      onDelete: 'SET NULL',
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('users', 'avatar_id');
  },
};
