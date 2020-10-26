const express = require('express');
const router = express.Router();
const passport = require('passport');


const forgetController=require('../controllers/forgot_password');
router.post('/create', forgetController.create);
router.get('/forget-password', forgetController.home);
module.exports = router;