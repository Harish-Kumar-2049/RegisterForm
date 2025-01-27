const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    projectLinks: { type: String }, 
    description: { type: String },
    profileImage: { type: String }, // Storing the file path or URL of the image
}, { timestamps: true }); 

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
