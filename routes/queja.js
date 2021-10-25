const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const quejaController = require('../controllers/queja.controller'); 
// 3.
router.get('/listarQuejas', quejaController.obtenerTodasLasQuejas); 
router.post('/crearQueja', quejaController.crearQueja);
router.post('/filtro', quejaController.filtro); 
//router.put('/actualizarRol/:id', rolController.actualizarUnRol); 
router.delete('/eliminarQueja/:id', quejaController.eliminarUnaQueja); 
// 4. 
module.exports = router; // export to use in server.js