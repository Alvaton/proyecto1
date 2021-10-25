const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const rolController = require('../controllers/roles.controller'); 
// 3.
router.get('/listarRoles', rolController.obtenerTodosLosRoles); 
router.post('/crearRol', rolController.insertarUnRol); 
router.put('/actualizarRol/:id', rolController.actualizarUnRol); 
router.delete('/eliminarRol/:id', rolController.eliminarUnRol); 
// 4. 
module.exports = router; // export to use in server.js