const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    code: { type: String },
    plate: { type: String },
    phone: { type: String },
    career: { type: String },
    mail: { type: String },
    password: { type: String },
    qr: { type: String },
    status: { type: String, default: 'Activo' },
    creatorId: { type: String },
    createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);