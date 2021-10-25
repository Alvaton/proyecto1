const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const recursoController = require('../controllers/recurso.controller'); 
// 3.
router.get('/listarRecurso', recursoController.obtenerTodosLosRecursos); 
router.post('/crearRecurso', recursoController.insertarUnRecurso); 
router.put('/actualizarRecurso/:id', recursoController.actualizarUnRecurso); 
router.put('/actualizarRecurso/:id', recursoController.actualizarUnRecurso); 
router.put('/decIncInventario/:id', recursoController.dec_incInventario);
router.delete('/eliminarRecurso/:id', recursoController.eliminarUnRecurso); 

module.exports = router;