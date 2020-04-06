const {Food} = require('../models');

function authorization(req, res, next) {
    let id = req.params.id;
    Food.findByPk(id).then(data => {
        if(data) {
            if(data.UserId === req.userId) {
                req.food = data;
                next();
            } else {
                res.status(401).json({error: 'You are not authorized to access this food item'});
            }
        } else {
            res.status(404).json({error: 'Food not found'});
        }
    }).catch(next);
}

module.exports = authorization;