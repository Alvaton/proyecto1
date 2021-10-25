const db = require('../mysql/conexionMysql');

async function dec_incInventario(req, res){
    // Obtener la informacion del registro de recurso
    const codigorecurso = Number(req.params.id);
    const recursoObtenido = await db.Recurso.findByPk(codigorecurso);
    // Extrae la cantidad 
    const { cantidad } = req.body;
    // Se crea la condicion
    const condicion = {
        where:{
            codigorecurso
        }
    };
    // Se actualiza
    const recursoActualizado = await db.Recurso.update({
        cantidad: cantidad + recursoObtenido.cantidad
    },condicion)
    return res.send(recursoActualizado);
}

async function obtenerTodosLosRecursos(req, res){
    const todosRecursos = await db.Recurso.findAll();
    return res.send(todosRecursos);
}

async function insertarUnRecurso(req, res){
    const recursoCreado = await db.Recurso.create(req.body);
    return res.send(recursoCreado);
}

async function actualizarUnRecurso(req, res){
    const params = req.body;
    const codigorecurso = req.params.id;
    const condicion = {
        where:{
            codigorecurso
        }
    };
    const recursoActualizado = await db.Recurso.update(params,condicion)
    return res.send(recursoActualizado);
}


async function eliminarUnRecurso(req, res){
    const codigorecurso = req.params.id;
    try {
        const condicion = {
            where:{
                codigorecurso
            }
        };
        const recursoEliminado = await db.Recurso.destroy(condicion);
        res.send({response:'Eliminado exitosamente'});
    } catch (error) {
    }
}
module.exports = {
    obtenerTodosLosRecursos,
    insertarUnRecurso,
    actualizarUnRecurso,
    eliminarUnRecurso,
    dec_incInventario
}