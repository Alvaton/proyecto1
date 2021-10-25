const db = require('../mysql/conexionMysql');

async function obtenerTodosLosEmpleados(req,res){
    const todosEmpleados = await db.Empleado.findAll();
    return res.send(todosEmpleados);
}

async function crearUnEmpleado(req,res){
    const existeEmpleado = await db.Empleado.findOne({
        where:{
            ibm: req.body.ibm
        }
    });
    if(!existeEmpleado){
        const empleadoCreado = await db.Empleado.create(req.body);
        return res.send(empleadoCreado);
    }else{
        res.status(400).send({
            message: `El empleado con el ibm ${req.body.ibm} ya existe`
         });
    }
    
}

async function actualizarEmpleado(req, res){
    const actualizar =  req.body;
    const codigoempleado =  +req.params.id;
    const condicion = {
        where: {
            codigoempleado: codigoempleado
        }
    }
    const empleadoActualizado = await db.Empleado.update(actualizar,condicion)
    return res.send(empleadoActualizado);
}

async function eliminarEmpleado(req,res){
    const codigoempleado = req.params.id;
    const condicion = {
        where: {
            codigoempleado: codigoempleado
        }
    }
    const empleadoEliminado = await db.Empleado.destroy(condicion);
    res.send({response:'Eliminado exitosamente'});
}

module.exports = { obtenerTodosLosEmpleados, crearUnEmpleado, actualizarEmpleado, eliminarEmpleado }