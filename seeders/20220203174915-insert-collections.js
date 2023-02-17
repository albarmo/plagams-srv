'use strict';

const { v4: uuidv4 } = require('uuid');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Collections',
      [
        {
          id: '966c3c31-6af4-4ca2-b6d0-f6de962895b8',
          title: 'Collection 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          title: 'Collection 2',
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
