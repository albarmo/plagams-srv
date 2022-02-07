const bannerRouter = require('express').Router();
const BannerController = require('../controllers/bannersControllers');
const { authorization, authentification } = require('../middleware/Auth');

bannerRouter.get('/', BannerController.list);

bannerRouter.use(authentification);
bannerRouter.use(authorization);
bannerRouter.post('/', BannerController.create);
bannerRouter.put('/:id', BannerController.update);
bannerRouter.delete('/:id', BannerController.delete);

module.exports = bannerRouter;
