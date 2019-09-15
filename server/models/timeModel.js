const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    //id: { type: Int16Array, required: true },
    t_inicio: { type: Date, default: Date.now },
    t_salida: { type: Date, default: Date.now },
    id_cajon: { type: String },
    id_usuario: { type: String },
    creatorId: { type: String },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('timeModel', userSchema);