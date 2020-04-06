const jwt = require('jsonwebtoken');
const {User} = require('../models');

function authentication(req, res, next) {
    try {
        let payload = jwt.verify(req.headers.access_token, process.env.JWT_SECRETKEY);
        req.userId = payload.id;
        req.email = payload.email;
    } catch(err) {
        console.log(err);
        res.status(400).json({error: 'Missing or invalid access token'});
    }
    User.findByPk(req.userId).then(data => {
        if(data) {
            req.user = data;
            next();
        } else {
            res.status(400).json({error: 'Invalid User'});
        }
    }).catch(next);
}

module.exports = authentication;