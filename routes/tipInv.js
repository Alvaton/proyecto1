const express = require('express'); //import express

// 1.
const router  = express.Router(); 
// 2.
const tipInvController = require('../controllers/tipo_inventario.controller'); 
// 3.
router.get('/listarTipInv', tipInvController.obtenerTodosLosTipInv); 
router.post('/crearTipInv', tipInvController.insertarUnTipInv); 
router.put('/actualizarTipInv/:id', tipInvController.actualizarUnTipInv); 
router.delete('/eliminarTipInv/:id', tipInvController.eliminarUnTipInv); 
// 4. 
module.exports = router; // export to use in server.js