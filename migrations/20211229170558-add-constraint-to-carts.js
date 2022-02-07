'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Carts', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Fkey_Users_Carts',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Carts', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'Fkey_Products_Carts',
      references: {
        table: 'Products',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Carts', 'Fkey_Users_Carts', {});
    await queryInterface.removeConstraint('Carts', 'Fkey_Products_Carts', {});
  },
};
