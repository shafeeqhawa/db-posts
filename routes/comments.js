const express= require('express')
const router= express.Router()
const commentcontroller= require('../controller/commentcontroller')
const {isAuth}= require('../middlewares')

router.post("/createcomment", isAuth, commentcontroller.createcomment)
router.get("/getcomments/:id", isAuth, commentcontroller.getcomment)
router.put("/editcomment", isAuth, commentcontroller.editcomment)


module.exports=router
