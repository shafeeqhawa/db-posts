const express= require('express')
const router = express.Router()
const postController = require('../controller/postcontroller')
const {isAuth}= require('../middlewares')

router.get("/", isAuth, postController.getAllPosts)
router.get("/:id", isAuth, postController.getSinglePost)
router.post("/", isAuth, postController.createPost)
// router.delete("/:id", isAuth, postController.deletePost)
router.put("/", isAuth, postController.editPost)

module.exports= router 