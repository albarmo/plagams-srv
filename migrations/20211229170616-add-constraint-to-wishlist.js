'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Wishlists', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'Fkey_Users_Wishlists',
      references: {
        table: 'Users',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Wishlists', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'Fkey_Products_Wishlists',
      references: {
        table: 'Products',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Wishlists', 'Fkey_Users_Wishlists', {});
    await queryInterface.removeConstraint('Wishlists', 'Fkey_Products_Wishlists', {});
  },
};
