const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const ConfigJwt = require('../models/configJwt');
const User = require('../models/userModel');

const params = {
    secretOrKey: ConfigJwt.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(new BasicStrategy(
    function (username, password, callback) {
        const collationOptions = { locale: 'es', strength: 1 };

        User.findOneAndUpdate({ username: username, status: 'Activo' }, {
            $inc: { sessionCount: 1 }
        }, { collation: collationOptions }, function (err, user) {

            if (err) { return callback(err); }
            if (!user) {
                return callback(null, false, { msg: `No se ha podido localizar al usuario ${username}.` });
            }

            user.verifyPassword(password, function (err, isMatch) {
                if (err) { return callback(err); }

                if (!isMatch) { return callback(null, false, { msg: `La contraseña es incorrecta.` }); }

                return callback(null, user);
            });
        });
    }
));

passport.use(new JwtStrategy(params,
    function (jwt_payload, callback) {
        User.findOne({ _id: jwt_payload.id, session: jwt_payload.session, status: 'Activo' }, function (err, user) {

            if (err) { return callback(err, false); }
            if (!user) {
                return callback(null, false, { msg: `No se ha podido localizar al usuario.` });
            }

            return callback(null, user);
        });
    }
));

exports.isBasicAuthenticated = passport.authenticate('basic', { session: false });
exports.isJwtAuthenticated = passport.authenticate('jwt', { session: false });