const express = require('express')
const { registerController, loginController, updateUsercontroller, requireSignIn } = require('../controllers/userController')

const router = express.Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.put("/update-user",requireSignIn, updateUsercontroller)




module.exports=router