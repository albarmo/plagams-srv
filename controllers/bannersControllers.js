const { Banner } = require('../models');
const uploader = require('../helpers/uploader');

class BannerController {
  static async list(req, res, next) {
    try {
      const data = await Banner.findAll();
      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      next(error);
    }
  }
  static create(req, res, next) {
    try {
      const upload = uploader('BANNER_IMAGE').fields([{ name: 'file' }]);
      upload(req, res, (err) => {
        if (err) {
          next(error);
        }
        const { file } = req.files;
        const imagePath = file ? '/' + file[0].filename : null;

        let inputData = {
          title: req.body.title,
          description: req.body.description,
          target: req.body.target,
          date: new Date(),
          file: imagePath,
          isActive: true,
        };

        Banner.create(inputData)
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
      const upload = uploader('BANNER_IMAGE').fields([{ name: 'file' }]);
      upload(req, res, (err) => {
        if (err) {
          return res.status(500).json({ msg: err });
        }
        const { file } = req.files;
        const imagePath = file ? '/' + file[0].filename : null;

        let inputDataUpdate = {
          title: req.body.title,
          description: req.body.description,
          target: req.body.target,
          date: new Date(),
          file: imagePath,
          isActive: req.body.isActive,
        };
        Banner.update(inputDataUpdate, {
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
      const banner = await Banner.destroy({
        where: {
          id: id,
        },
        returning: true,
      });
      return res.status(200).json({ banner });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = BannerController;
