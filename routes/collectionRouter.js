const collectionRouter = require('express').Router();
const collectionControllers = require('../controllers/collectionControllers');
const { authorization, authentification } = require('../middleware/Auth');

collectionRouter.get('/', collectionControllers.list);

collectionRouter.use(authentification);
collectionRouter.use(authorization);
collectionRouter.post('/', collectionControllers.create);
collectionRouter.put('/:id', collectionControllers.update);
collectionRouter.delete('/:id', collectionControllers.delete);

module.exports = collectionRouter;
