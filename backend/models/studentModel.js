const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    age : {type : Number, required : true},
    image : {type : String}
})

const Student = mongoose.model('Student', studentSchema)

module.exports = Student