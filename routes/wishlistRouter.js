const wishlistRouter = require('express').Router();
const WishlistController = require('../controllers/wishlistControllers');
const { authentification } = require('../middleware/Auth');

wishlistRouter.use(authentification);
wishlistRouter.get('/', WishlistController.list);
wishlistRouter.post('/', WishlistController.addToWishlist);
wishlistRouter.delete('/:ProductId', WishlistController.delete);

module.exports = wishlistRouter;
