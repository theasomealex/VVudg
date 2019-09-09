const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const ConfigJwt = require('../models/configJwt');

// Endpoint to create new JWT (token for authentication)
exports.authUser = function (req, res) {
    const credentials = {
        id: req.user._id.valueOf(),
        sessionCount: req.user.sessionCount
    };

    const token = jwt.sign(credentials, ConfigJwt.jwtSecret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    res.json({ rc: '00', token: token });
};

// GET - SEARCH
exports.userGET = function (req, res) {
    User.find(function (err, user) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar recuperar el usuario' });

        res.json({ rc: '00', msg: 'La recuperación del usuario se realizó con éxito', result: user });
    });
};

// GET BY ID - SEARCH BY ID
exports.userGETBYID = function (req, res) {
    const id = req.params.id;
    User.findOne({ _id: id }, function (err, user) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar recuperar el usuario' });

        res.json({ rc: '00', msg: 'La recuperación del usuario se realizó con éxito', result: user });
    });
};

// POST - CREATE
exports.userPOST = function (req, res) {
    User.findOne({ code: req.body.code }, function (err, user) {
        if (user) {
            res.json({ rc: '99', msg: 'El usuario ya existe' });
        } else {
            User.findOne({ mail: req.body.mail }, function (err, user) {
                if (user) {
                    res.json({ rc: '98', msg: 'El usuario ya existe' });
                } else {
                    const user = new User({
                        username: req.body.username,
                        password: req.body.password,
                        mail: req.body.mail,
                        code: req.body.code,
                        plate: req.body.plate,
                        phone: req.body.phone,
                        qr: req.body.qr,
                        career: req.body.career,
                        status: req.body.status
                    });
                    user.save(function (err, user) {
                        if (err && err.code === 11000)
                            res.json({ rc: "98", msg: "No ha sido posible realizar el registro con la inormación proporcionada.", err: err });
                        else if (err)
                            res.json({ rc: "99", msg: "Ocurrió un error al intentar registrar el usuario.", err: err });

                        res.json({ rc: "00", msg: "El registro del usuario se realizó con éxito.", result: user });
                    });
                }
            });
        }
    });
};

// PUT - UPDATE
exports.userPUT = function (req, res) {
    const id = req.params.id;
    const user = {
        name: req.body.name,
        code: req.body.code,
        plate: req.body.plate,
        phone: req.body.phone,
        career: req.body.career,
        mail: req.body.mail,
        pass: req.body.pass
    };

    User.updateOne({ _id: id }, { $set: user }, function (err, user) {
        if (err)
            res.json({ rc: '98', msg: 'Ocurrió un error al intentar actualizar el usuario' });

        res.json({ rc: '00', msg: 'La actualización del usuario se realizó con éxito', result: user });
    });
};

// DELETE - REMOVE
exports.userDELETE = function (req, res) {
    const id = req.params.id;

    User.deleteOne({ _id: id }, function (err, user) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar eliminar el usuario' });

        res.json({ rc: '00', msg: 'La eliminación del usuario se realizó con éxito', result: user });
    });
};
