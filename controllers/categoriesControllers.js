const { Categorie, Collection, Product } = require('../models');
const { Op } = require('sequelize');

class CategorieControllers {
  static async list(req, res, next) {
    try {
      const data = await Categorie.findAll({
        include: {
          model: Collection,
          attributes: ['id', 'title'],
          include: {
            model: Product,
            where: {
              stock: {
                [Op.gt]: 0,
              },
            },
            order: [['title', 'ASC']],
          },
        },
      });
      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      let inputData = {
        title: req.body.title,
      };
      const category = await Categorie.create(inputData);
      if (category) {
        return res.status(201).json({ category });
      }
    } catch (error) {
      next(error);
    }
  }

  static async update(req, res, next) {
    try {
      const categorieId = req.params.id;
      let inputDataUpdate = {
        title: req.body.title,
      };
      const updateCategorie = await Categorie.update(inputDataUpdate, {
        where: {
          id: categorieId,
        },
        returning: true,
      });
      if (updateCategorie) {
        return res.status(200).json({ updateCategorie });
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const categorieId = req.params.id;
    try {
      const isExist = await Categorie.findOne({ where: { id: categorieId } });
      if (!isExist) {
        return res.status(404).json({ message: 'categorie data not found!' });
      } else {
        const deleteCategories = await Categorie.destroy({
          where: {
            id: categorieId,
          },
          returning: true,
        });
        if (deleteCategories) {
          return res.status(200).json({ status: `sucess deleted categorie ${categorieId}` });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CategorieControllers;
