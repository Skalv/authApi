var express = require('express');
var router = express.Router();

var User = require("../models/user");
var jwt = require("jsonwebtoken");
var Config = require("../config")

router.post('/login', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) res.send(err)
        
        if(!user) {
            // L'email n'est pas présent en BDD => Pas d'utilsateur
            res.send("Email invalide.")
        } else if (user) {
            // Mot de passe incorrect
            if (user.password != req.body.password) {
              res.send("Mot de passe invalide.")  
            } else {
                // Si utilisateur et mot de passe correct.
                var token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 60,
                    data: user
                }, Config.secret);

                res.json({
                    success: true,
                    message: "Connecté !",
                    token: token
                })
            }
        }
    })
})

module.exports = router;