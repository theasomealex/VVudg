const Cajon = require('../models/cajonModel');

// GET - SEARCH
exports.cajonGET = function(req, res) {
    Cajon.find(function(err, Cajon) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar recuperar la Cajon' });

        res.json({ rc: '00', msg: 'La recuperación de la Cajon se realizó con éxito', result: Cajon });
    });
};

// GET BY ID - SEARCH BY ID
exports.cajonGETBYID = function(req, res) {
    const id = req.params.id;
    Cajon.findOne({ _id: id }, function(err, Cajon) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar recuperar la Cajon' });

        res.json({ rc: '00', msg: 'La recuperación de la Cajon se realizó con éxito', result: Cajon });
    });
};

// POST - CREATE
exports.cajonPOST = function(req, res) {
    const Cajon = new Cajon({ message: req.body.message });
    Cajon.save(function(err, Cajon) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar registrar la Cajon' });

        res.json({ rc: '00', msg: 'El registro de la Cajon se realizó con éxito', result: Cajon });
    });
};

// PUT - UPDATE
exports.cajonPUT = function(req, res) {
    const id = req.params.id;
    const Cajon = { message: req.body.message };

    Cajon.updateOne({ _id: id }, { $set: Cajon }, function(err, Cajon) {
        if (err)
            res.json({ rc: '98', msg: 'Ocurrió un error al intentar actualizar la Cajon' });

        res.json({ rc: '00', msg: 'La actualización de la Cajon se realizó con éxito', result: Cajon });
    });
};

// DELETE - REMOVE
exports.cajonDELETE = function(req, res) {
    const id = req.params.id;

    Cajon.deleteOne({ _id: id }, function(err, Cajon) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar eliminar la Cajon' });

        res.json({ rc: '00', msg: 'La eliminación de la Cajon se realizó con éxito', result: Cajon });
    });
};