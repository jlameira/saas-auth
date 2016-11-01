/**
 * Created by jonathanlameira on 01/11/16.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var crypto = require('crypto');

// Schema User
var Schema = mongoose.Schema;

/* The user schema attributes / characteristics / fields */
var UserSchema = new Schema({

    email: { type: String, unique: true, lowercase: true},
    password: {type:String, required:true},
    role:{
        type:String,
        enum:['Cliente', 'Gerente','Admin'],
        default:'Cliente'
    },
    address: { type: String }
});

/*  faz um Hash no password depois salva no banco */
UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


/* Comparar a senha no banco de dados e a que o usuário digitou */
UserSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
