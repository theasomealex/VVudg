const User = require('../models/userModel');

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
                        name: req.body.name,
                        code: req.body.code,
                        plate: req.body.plate,
                        phone: req.body.phone,
                        qr: req.body.qr,
                        career: req.body.career,
                        mail: req.body.mail,
                        pass: req.body.pass
                    });
                    user.save(function (err, user) {
                        res.json({ rc: '00', msg: 'El registro del usuario se realizó con éxito', result: user });
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
