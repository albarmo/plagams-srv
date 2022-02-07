const { Collection, Product } = require('../models');
const uploader = require('../helpers/uploader');

class collectionControllers {
  static async list(req, res, next) {
    try {
      const collection = await Collection.findAll({
        include: [
          {
            model: Product,
          },
        ],
      });
      return res.status(200).json({ collection });
    } catch (error) {
      next(error);
    }
  }

  static create(req, res, next) {
    try {
      const upload = uploader('COLLECTION_IMAGE').fields([{ name: 'image' }]);
      upload(req, res, (err) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
        const { image } = req.files;
        const imagePath = image ? '/' + image[0].filename : null;

        let inputData = {
          title: req.body.title,
          ProductId: req.body.ProductId,
          CategoryId: req.body.CategoryId,
          image: imagePath,
        };

        Collection.create(inputData)
          .then((data) => {
            return res.status(201).json({ data });
          })
          .catch((error) => {
            next(error);
          });
      });
    } catch (error) {
      next(error);
    }
  }

  static update(req, res, next) {
    try {
      const { id } = req.params;
      const upload = uploader('COLLECTION_IMAGE').fields([{ name: 'image' }]);
      upload(req, res, (err) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
        const { image } = req.files;
        const imagePath = image ? '/' + image[0].filename : null;

        let inputDataUpdate = {
          title: req.body.title,
          ProductId: req.body.ProductId,
          CategoryId: req.body.CategoryId,
          image: imagePath,
        };
        Collection.update(inputDataUpdate, {
          where: {
            id: id,
          },
          returning: true,
        })
          .then((data) => {
            return res.status(200).json({ data });
          })
          .catch((error) => {
            next(error);
          });
      });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req, res, next) {
    const { id } = req.params;
    try {
      const deleteCollection = await Collection.destroy({
        where: {
          id: id,
        },
        returning: true,
      });
      return res.status(200).json({ deleteCollection });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = collectionControllers;
