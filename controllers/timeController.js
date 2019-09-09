const Time = require('../models/timeModel');

// GET - SEARCH
exports.timeGET = function (req, res) {
    Time.find(function (err, time) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar recuperar la prueba' });

        res.json({ rc: '00', msg: 'La recuperación de la prueba se realizó con éxito', result: time });
    });
};

// GET BY ID - SEARCH BY ID
exports.timeGETBYID = function (req, res) {
    const id = req.params.id;
    Time.findOne({ _id: id }, function (err, time) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar recuperar la prueba' });

        res.json({ rc: '00', msg: 'La recuperación de la prueba se realizó con éxito', result: time });
    });
};

// POST - CREATE
exports.timePOST = function (req, res) {
    const time = new Time({ t_inicio: req.body.t_inicio, t_salida: req.body.t_salida, id_cajon: req.body.id_cajon, id_usuario: req.body.id_usuario });
    time.save(function (err, time) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar registrar la prueba' });

        res.json({ rc: '00', msg: 'El registro de la prueba se realizó con éxito', result: time });
    });
};
// POST - CREATE
exports.timePOST = function (req, res) {
    const time = new Time({ t_salida: req.body.t_salida, id_cajon: req.body.id_cajon, id_usuario: req.body.id_usuario });
    time.save(function (err, time) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar registrar la prueba' });

        res.json({ rc: '00', msg: 'El registro de la prueba se realizó con éxito', result: time });
    });
};

// PUT - UPDATE
exports.timePUT = function (req, res) {
    const id = req.params.id;
    const time = { t_inicio: req.body.t_inicio, t_salida: req.body.t_salida };

    Time.updateOne({ _id: id }, { $set: time }, function (err, time) {
        if (err)
            res.json({ rc: '98', msg: 'Ocurrió un error al intentar actualizar la prueba' });

        res.json({ rc: '00', msg: 'La actualización de la prueba se realizó con éxito', result: time });
    });
};

// DELETE - REMOVE
exports.timeDELETE = function (req, res) {
    const id = req.params.id;

    Time.deleteOne({ _id: id }, function (err, time) {
        if (err)
            res.json({ rc: '99', msg: 'Ocurrió un error al intentar eliminar la prueba' });

        res.json({ rc: '00', msg: 'La eliminación de la prueba se realizó con éxito', result: time });
    });
};
