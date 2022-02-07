const { User, Cart, Product, History } = require('../models');

class HistoryControllers {
  static async list(req, res, next) {
    try {
      const history = await History.findAll({
        include: [
          {
            model: Cart,
            include: {
              model: Product,
            },
          },
          { model: User },
        ],
      });
      return res.status(200).json({ history });
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    const inputData = {
      UserId: req.body.UserId,
      CartId: req.body.CartId,
      date: new Date(),
      status: req.body.status,
      paymentDate: req.body.paymentDate,
    };
    try {
      const history = await History.create(inputData);
      return res.status(201).json({
        history,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = HistoryControllers;
