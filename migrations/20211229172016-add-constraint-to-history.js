'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Histories', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Fkey_User_Histories',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Histories', {
      fields: ['CartId'],
      type: 'foreign key',
      name: 'Fkey_Carts_Histories',
      references: {
        table: 'Carts',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Histories', 'Fkey_Users_Histories', {});
    await queryInterface.removeConstraint('Histories', 'Fkey_Carts_Histories', {});
  },
};
