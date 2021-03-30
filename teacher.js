var mongoose = require('mongoose');
var teacherSchema = mongoose.Schema({
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
var Teacher = module.exports = mongoose.model('teacher', teacherSchema);
module.exports.get = function (callback, limit) {
    Teacher.find(callback).limit(limit);
}