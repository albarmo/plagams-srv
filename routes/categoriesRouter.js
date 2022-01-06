const categoriesRouter = require('express').Router();
const CategoriesController = require('../controllers/categoriesControllers');
const { authorization, authentification } = require('../middleware/Auth');

categoriesRouter.get('/', CategoriesController.list);

categoriesRouter.use(authentification);
categoriesRouter.use(authorization);
categoriesRouter.post('/', CategoriesController.create);
categoriesRouter.put('/:id', CategoriesController.update);
categoriesRouter.delete('/:id', CategoriesController.delete);

module.exports = categoriesRouter;
