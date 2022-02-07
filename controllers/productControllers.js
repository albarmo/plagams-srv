const { Product, Collection, Categorie } = require('../models');
const { Op } = require('sequelize');
const uploader = require('../helpers/uploader');

class ProductController {
  static async list(req, res, next) {
    try {
      const data = await Product.findAll({
        include: {
          model: Collection,
          attributes: ['id', 'title'],
          include: {
            model: Categorie,
            attributes: ['id', 'title'],
          },
        },
        where: {
          stock: {
            [Op.gt]: 0,
          },
        },

        order: [['title', 'ASC']],
      });
      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      next(error);
    }
  }

  static create(req, res, next) {
    try {
      const upload = uploader('PRODUCT_IMAGE').fields([{ name: 'images' }]);
      upload(req, res, (err) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
        const { images } = req.files;
        const imagePath = images ? '/' + images[0].filename : null;

        let inputData = {
          title: req.body.title,
          color: req.body.color,
          size: req.body.size,
          description: req.body.description,
          stock: req.body.stock,
          images: imagePath,
          price: req.body.price,
          weight: req.body.weight,
          CollectionId: req.body.CollectionId,
        };

        Product.create(inputData)
          .then((data) => {
            return res.status(201).json({ data });
          })
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
      });
    } catch (error) {
      next(error);
    }
  }

  static update(req, res, next) {
    try {
      const idProduct = req.params.id;
      const upload = uploader('PRODUCT_IMAGE').fields([{ name: 'images' }]);
      upload(req, res, (err) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
        const { images } = req.files;
        const imagePath = images ? '/' + images[0].filename : null;

        let inputDataUpdate = {
          title: req.body.title,
          color: req.body.color,
          size: req.body.size,
          description: req.body.description,
          stock: req.body.stock,
          images: imagePath,
          price: req.body.price,
          weight: req.body.weight,
          CollectionId: req.body.CollectionId,
        };
        Product.update(inputDataUpdate, {
          where: {
            id: idProduct,
          },
          returning: true,
        })
          .then((data) => {
            return res.status(200).json({ data });
          })
          .catch((error) => {
            return res.status(500).json({ message: error });
          });
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const idProduct = req.params.id;
    const product = await Product.findOne({ where: { id: idProduct } });
    try {
      if (!product) {
        return res.status(404).json({ message: 'product data not found!' });
      } else {
        const deleteProduct = await Product.destroy({
          where: {
            id: idProduct,
          },
          returning: true,
        });
        if (deleteProduct) {
          return res.status(200).json({ msg: `sucess deleted products ${idProduct}` });
        }
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
