const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const recursoEmpleadoController = require('../controllers/recurso_empleado.controller'); 
// 3.
router.get('/listarRecursoEmpleado', recursoEmpleadoController.obtenerTodosLosRecursos); 
router.post('/crearRecursoEmpleado', recursoEmpleadoController.insertarUnRecurso); 
router.post('/filtrar', recursoEmpleadoController.existeAsignacion); 
router.post('/listarRecursoEmpleadoFiltro', recursoEmpleadoController.filtro); 

router.put('/actualizarRecursoEmpleado/:idR/:idE', recursoEmpleadoController.actualizarUnRecurso); 
router.delete('/eliminarRecursoEmpleado/:idR/:idE', recursoEmpleadoController.eliminarUnRecurso); 

module.exports = router;