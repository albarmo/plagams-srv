const advertisementRouter = require('express').Router();
const AdvertisementController = require('../controllers/advertisementControllers');
const { authorization, authentification } = require('../middleware/Auth');

advertisementRouter.get('/', AdvertisementController.list);

advertisementRouter.use(authentification);
advertisementRouter.use(authorization);
advertisementRouter.post('/', AdvertisementController.create);
advertisementRouter.put('/:id', AdvertisementController.update);
advertisementRouter.delete('/:id', AdvertisementController.delete);

module.exports = advertisementRouter;
