var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', function(req, res, next) {
    if(!req.body.email || !req.body.password){
        res.json({Success:false, message: 'Por favor informe o email e a senha para se registrar '})
    }else{
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });


        newUser.save(function (err) {
            if(err){
                return res.json({success:false, message: 'Este email já esta cadastrado em outra conta'})
            }
            res.json({success:true, message:'Conta criada com sucesso'})
        });
    }
});

router.post('/authenticate', function (req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if(err) throw err;

        if (!user) {
            res.send({ success: false, message: 'Authentication failed. User not found.' });
        }  else {
            user.comparePassword(req.body.password, function (err, isMatch) {
                if(isMatch && !err){
                    var token = jwt.sign(user, config.secret,{
                        expiresIn: 10080
                    });
                    res.json({success:true, token: 'JWT ' + token});
                }else{
                    res.send({success:false, message:'Falha na Autenticaçao'})
                }
            });
        }
    });

});

module.exports = router;
