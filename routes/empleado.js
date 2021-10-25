const express = require('express'); //import express
// 1.
const router  = express.Router(); 
// 2.
const empleadoController = require('../controllers/empleado.controller');
// 3.
router.get('/listarEmpleados', empleadoController.obtenerTodosLosEmpleados); 
router.post('/crearEmpleado', empleadoController.crearUnEmpleado); 
router.put('/actualizarEmpleado/:id', empleadoController.actualizarEmpleado); 
router.delete('/eliminarEmpleado/:id', empleadoController.eliminarEmpleado); 

module.exports = router;