const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    plate: { type: String, required: true },
    phone: { type: String, required: true },
    qr: { type: String },
    career: { type: String, required: true },
    mail: { type: String, required: true },
    pass: { type: String, require: true },
    creatorId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('userModel', userSchema);