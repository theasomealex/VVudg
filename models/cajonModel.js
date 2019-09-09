const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cajonSchema = new Schema({

    creatorId: { type: String },
    createdAt: { type: Date, default: Date.now },
    lugar: { type: String },
    status: { type: String }
});

module.exports = mongoose.model('cajonModel', cajonSchema);