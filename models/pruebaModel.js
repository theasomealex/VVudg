const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pruebaSchema = new Schema({

    creatorId: { type: String },
    createdAt: { type: Date, default: Date.now },
    message: { type: String }
});

module.exports = mongoose.model('pruebaModel', pruebaSchema);