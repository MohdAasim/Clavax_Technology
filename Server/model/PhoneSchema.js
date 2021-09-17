const mongoose = require('mongoose')


const PhoneSchema =new mongoose.Schema({
    contactName: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    website: {
        type: String,
    },
    image: {
        type: String
    },
    contactType: {
        type: String,
        required: true,
    },
    contactNumber:{
            type: String,
            require:true,
    },
    contactNumber1:{
            type: String,
    }
})
const Phonebook = mongoose.model('Phonebook',PhoneSchema)
module.exports = Phonebook;