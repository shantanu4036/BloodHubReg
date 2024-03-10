const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        required:true
    },
    middleName: {
        type: String,
        required:true
        
    },
   lastName: {
        type: String,
        required:true
        
    },
    email: {
        type: String,
        required: true,
        unique:true
       
    },
    phone: {
        type: Number,
        required: true,
        unique:true
       
    },
    
    gender: {
        type: String,
        required:true
    },
      age: {
        type:Number,
        required:true
        
    },
    password: {
        type: String,
        required:true
        
    },
    confirmpassword: {
        type: String,
        required:true
    },
    bloodgroup: {
        type: String,
        required:true
    }


})


const Register = new mongoose.model("Register", employeeSchema);
module.export = Register;