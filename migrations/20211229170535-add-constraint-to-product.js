'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Products', {
      fields: ['CollectionId'],
      type: 'foreign key',
      name: 'Fkey_Collections_Products',
      references: {
        table: 'Collections',
        field: 'id',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Products', 'Fkey_Collections_Products', {});
  },
};
