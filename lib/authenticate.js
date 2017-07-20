var express = require('express');
var router = express.Router();

var jwt = require("jsonwebtoken");
var Config = require('../config');

router.use(function(req, res, next) {
    // On récup le token depuis la req
    var token = req.body.token || req.headers['x-access-token'];

    // Si on a un token
    if (token) {
        jwt.verify(token, Config.secret, function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: "Invalid token"
                })
            } else {
                next();
            }
        })
    } else {
        res.status(403).send({
            success: false,
            message: 'No token'
        })
    }
})

module.exports = router;