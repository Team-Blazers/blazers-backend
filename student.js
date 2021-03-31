var mongoose = require('mongoose');
var studentSchema = mongoose.Schema({
    email: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
});

// Export model
var Student = module.exports = mongoose.model('student', studentSchema);
module.exports.get = function (callback, limit) {
    Student.find(callback).limit(limit);
}