const { Wishlist, Product } = require('../models');

class WishlistControllers {
  static async list(req, res, next) {
    try {
      const data = await Wishlist.findAll({
        where: { UserId: req.userData.id },
        include: [Product],
      });
      if (data) {
        return res.status(200).json({ data });
      }
    } catch (error) {
      next(error);
    }
  }

  static async addToWishlist(req, res, next) {
    let UserId = req.userData.id;
    let ProductId = req.body.ProductId;

    let inputData = {
      UserId: UserId,
      ProductId: ProductId,
    };

    try {
      const existingWishlist = await Wishlist.findOne({
        where: {
          UserId,
          ProductId,
        },
      });

      if (existingWishlist) {
        return res.status(200).json({ message: 'This product already added to wishlist' });
      } else {
        const newCart = await Wishlist.create(inputData);
        if (newCart) {
          return res.status(201).json({ newCart });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    let UserId = req.userData.id;
    let ProductId = req.params.ProductId;

    try {
      const deleteWishlist = await Wishlist.destroy({
        where: {
          UserId,
          ProductId,
        },
        returning: true,
      });
      if (deleteWishlist) {
        return res.status(200).json({ message: `success removed product from wishlist` });
      } else {
        return res.status(404).json({ message: `failed, product not in wishlist` });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = WishlistControllers;
