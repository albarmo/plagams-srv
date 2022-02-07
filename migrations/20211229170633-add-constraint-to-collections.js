'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Collections', {
      fields: ['CategoryId'],
      type: 'foreign key',
      name: 'Fkey_Users_Collections',
      references: {
        table: 'Categories',
        field: 'id',
      },
    });
    await queryInterface.addConstraint('Collections', {
      fields: ['ProductId'],
      type: 'foreign key',
      name: 'Fkey_Products_Collections',
      references: {
        table: 'Products',
        field: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Collections', 'Fkey_Users_Collections', {});
    await queryInterface.removeConstraint('Collections', 'Fkey_Products_Collections', {});
  },
};
