'use strict';

const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Collections',
      [
        {
          id: '966c3c31-6af4-4ca2-b6d0-f6de962895b8',
          productId: null,
          title: 'New Born',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          productId: null,
          title: 'Teen',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Collections', null, {});
  },
};
