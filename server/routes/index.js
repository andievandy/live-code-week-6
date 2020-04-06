const { Router } = require('express');
const jwt = require('jsonwebtoken');
const mainRouter = Router();
const {User, Food} = require('../models');

const errorHandler = require('../middlewares/errorhandler');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

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
mainRouter.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(data => {
        if(data && data.checkPassword(req.body.password)) {
            let access_token = jwt.sign({
                id: data.id,
                email: data.email
            }, process.env.JWT_SECRETKEY);
            res.status(200).json({access_token});
        } else {
            res.status(400).json({error: 'Invalid username/password'});
        }
    }).catch(next);
});
mainRouter.post('/foods', authentication, (req, res, next) => {
    Food.create({
        title: req.body.title,
        price: req.body.price,
        ingredients: req.body.ingredients,
        tag: req.body.tag,
        UserId: req.userId
    }).then(data => {
        res.status(201).json({
            title: data.title,
            price: data.price,
            ingredients: data.ingredients,
            tag: data.tag,
            UserId: data.UserId
        });
    }).catch(next);
});
mainRouter.get('/foods', authentication, (req, res, next) => {
    Food.findAll({
        where: {
            UserId: req.userId
        }
    }).then(data => {
        let viewableData = data.map(food => food.getViewableData());
        res.status(200).json(viewableData);
    }).catch(next);
});
mainRouter.delete('/foods/:id', authentication, authorization, (req, res, next) => {
    req.food.destroy().then(() => {
        res.status(200).json({
            message: 'Successfully delete food from your menu'
        })
    }).catch(next);
})
mainRouter.use(errorHandler);

module.exports = mainRouter;