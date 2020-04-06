const { Router } = require('express');
const mainRouter = Router();
const {User, Food} = require('../models');

const errorHandler = require('../middlewares/errorhandler');

mainRouter.post('/register', (req, res, next) => {
    User.create({
        email: req.body.email,
        password: req.body.password
    }).then(data => {
        res.status(201).json({
            id: data.id,
            email: data.email
        });
    }).catch(next);
});
mainRouter.use(errorHandler);

module.exports = mainRouter;