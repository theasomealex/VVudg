const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    sessionCount: { type: Number, default: 0 },
    username: { type: String, unique: true, uppercase: true },
    password: { type: String },
    mail: { type: String },
    code: { type: String },
    plate: { type: String },
    phone: { type: String },
    qr: { type: String },
    career: { type: String },
    status: { type: String, default: 'Activo' },
    creatorId: { type: String },
    createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (callback) {
    const user = this;

    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return callback(err);

            user.password = hash;
            callback(null, true);
        });
    });
});

UserSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
};

const UserModel = mongoose.model('User', UserSchema);

UserModel.collection.createIndex({ dependencyId: 1, status: 1 }, { unique: true, partialFilterExpression: { status: { $eq: 'Activo' } } }, function (err, success) {
    console.log(err, success);
});

module.exports = UserModel;