const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const authController = require('../controllers/auth.controller'); 
// 3.
router.post('/signin', authController.signIn); 
// 4. 
module.exports = router; // export to use in server.js