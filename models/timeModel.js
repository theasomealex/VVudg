const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: Int16Array, required: true },
    t_inicio: { type: Date, required: Date.now },
    t_salida: { type: Date, required: Date.now },
    id_cajon: { type: Int16Array, required: true },
    id_usuario: { type: Int16Array }
});

module.exports = mongoose.model('timeModel', userSchema);