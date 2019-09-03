const Prueba = require('../models/pruebaModel');

// GET - SEARCH
exports.pruebaGET = function (req, res) {
    Prueba.find(function (err, prueba) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar recuperar la prueba' });

        res.json({ rc: '00', msg: 'La recuperación de la prueba se realizó con éxito', result: prueba });
    });
};

// GET BY ID - SEARCH BY ID
exports.pruebaGETBYID = function (req, res) {
    const id = req.params.id;
    Prueba.findOne({ _id: id }, function (err, prueba) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar recuperar la prueba' });

        res.json({ rc: '00', msg: 'La recuperación de la prueba se realizó con éxito', result: prueba });
    });
};

// POST - CREATE
exports.pruebaPOST = function (req, res) {
    const prueba = new Prueba({ message: req.body.message });
    prueba.save(function (err, prueba) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar registrar la prueba' });

        res.json({ rc: '00', msg: 'El registro de la prueba se realizó con éxito', result: prueba });
    });
};

// PUT - UPDATE
exports.pruebaPUT = function (req, res) {
    const id = req.params.id;
    const prueba = { message: req.body.message };

    Prueba.updateOne({ _id: id }, { $set: prueba }, function (err, prueba) {
        if (err)
            res.json({ rc: '98', msg: 'Ocurrió un error al intentar actualizar la prueba' });

        res.json({ rc: '00', msg: 'La actualización de la prueba se realizó con éxito', result: prueba });
    });
};

// DELETE - REMOVE
exports.pruebaDELETE = function (req, res) {
    const id = req.params.id;

    Prueba.deleteOne({ _id: id }, function (err, prueba) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar eliminar la prueba' });

        res.json({ rc: '00', msg: 'La eliminación de la prueba se realizó con éxito', result: prueba });
    });
};
