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

    const body = req.body;
    const user = new User({
        username: body.username,
        code: body.code,
        plate: body.plate,
        phone: body.phone,
        career: body.career,
        mail: body.mail,
        password: body.password
    });
    user.save(function (err) {
        if (err) {
            res.json({ rc: '98', msg: 'Ocurrió un error al intentar registrar el usuario' });
        } else
            res.json({ rc: '00', msg: 'El registro del usuario se realizó con éxito', result: user });
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
