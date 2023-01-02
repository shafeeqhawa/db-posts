var express = require('express');
var router = express.Router();
const controllers = require('../controller/usercontroller');
const {isAuth} = require('../middlewares')
router.post('/', isAuth, controllers.update)
router.post('/signup', controllers.creatUser)
router.post('/login', controllers.login)

module.exports = router;
