const express = require('express')
const router = express.Router()
const Phonebook = require('../model/PhoneSchema')
require('../DbConn/dbconn')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/data/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-' + file.originalname )
    }
  })
  const upload = multer({ storage: storage })


  //saving the data
 router.post('/save',upload.single('image'),async (req,res)=>{
 let image = (req.file) ? req.file.filename :null
 console.log(image)
 const{contactName,email,website,contactType,contactNumber} = req.body;
 console.log(req.body)
 if (!contactName || !contactType || !contactNumber ) {
    return res.status(404).json({
        error: "please enter all the field"
    })    
}
try{
    const usernName = await Phonebook.findOne({
        contactName: contactName
    })
        const user = new Phonebook({
            contactName,email,website,image,contactType,contactNumber
        })
        await user.save()
        res.status(201).json({
            message: "User Registered"
        })  
}catch(err){
    console.log(err)
    if(err){
        console.log(err)
    }
}
})

router.get('/getdirectory',async (req,res)=>{
    try{
        const response = await Phonebook.find()
        res.send(response)
    }catch(err){
        res.status(404).json({
            error: "Not found"
        })
    }
})
 module.exports = router;