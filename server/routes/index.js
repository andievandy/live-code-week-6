const { Router } = require('express');
const jwt = require('jsonwebtoken');
const mainRouter = Router();
const {User, Food} = require('../models');

const errorHandler = require('../middlewares/errorhandler');
const authentication = require('../middlewares/authentication');

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
})
mainRouter.get('/foods', authentication, (req, res, next) => {
    // Food.findAll()
    req.user.getFood().then(data => {
        let viewableData = data.map(food => {
            return {
                id: food.id,
                title: food.title,
                price: food.price,
                ingredients: food.ingredients,
                tag: food.tag,
                UserId: food.UserId
            }
        })
        res.status(200).json(viewableData);
    }).catch(next);
});
mainRouter.use(errorHandler);

module.exports = mainRouter;