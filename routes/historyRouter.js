const historyRouter = require('express').Router();
const HistoryController = require('../controllers/historyControllers');
const { authentification, authorization } = require('../middleware/Auth');

historyRouter.use(authentification);
historyRouter.get('/', HistoryController.list);
historyRouter.post('/', authorization, HistoryController.create);

module.exports = historyRouter;
