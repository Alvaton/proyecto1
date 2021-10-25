const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const recursoDanadoController = require('../controllers/recurso_danado.controller'); 
// 3.
router.get('/listarRecDan', recursoDanadoController.obtenerTodosLosRecursosDanados); 
router.post('/crearRecDan', recursoDanadoController.insertarUnRecursoDanado);
router.post('/filtro', recursoDanadoController.filtro); 
router.delete('/eliminarRecDan/:id', recursoDanadoController.eliminarUnRecursoDanado); 
// 4. 
module.exports = router; // export to use in server.js