'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          id: 'e437e762-d1f6-475b-9fce-55a3b626a9aa',
          title: 'Product 1',
          color: 'red,white,blue',
          size: 'xl',
          description: 'aku adalah anak gembala suka memberi dan merokok',
          stock: 10,
          images: 'null',
          price: 1000,
          weight: '200',
          updatedAt: '2022-02-03T17:56:15.371Z',
          createdAt: '2022-02-03T17:56:15.371Z',
        },
        {
          id: 'e437e762-d1f6-475b-9fce-55a3b626a9bb',
          title: 'Product 2',
          color: 'red,white,blue',
          size: 'xl',
          description: 'aku adalah anak gembala suka memberi dan merokok',
          stock: 10,
          images: 'null',
          price: 1000,
          weight: '200',
          updatedAt: '2022-02-03T17:56:15.371Z',
          createdAt: '2022-02-03T17:56:15.371Z',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
