const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const quejaRecursoController = require('../controllers/queja_recurso.controller'); 
// 3.

router.post('/filtro', quejaRecursoController.filtro); 
// 4. 
module.exports = router; // export to use in server.js