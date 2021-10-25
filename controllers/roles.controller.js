const db = require('../mysql/conexionMysql');

async function obtenerTodosLosRoles(req,res){
    const todosRoles = await db.Rol.findAll();
    return res.send(todosRoles);
}

async function insertarUnRol(req, res){
    const rolCreado = await db.Rol.create(req.body);
    return res.send(rolCreado);
}

async function actualizarUnRol(req, res){
    const params = req.body;
    const codigorol = req.params.id;
    const actualizados = await db.Rol.update(
        params,
        { where: { codigorol: codigorol } }
      );
    return res.send(actualizados);
}

async function eliminarUnRol(req, res){
    const codigorol = req.params.id;
    try {
        const rolEliminado = await db.Rol.destroy({
            where: {
                codigorol : codigorol
            }
        });
        res.send({response:'Eliminado exitosamente'});
    } catch (error) {
    }
}

module.exports = {
    obtenerTodosLosRoles, 
    insertarUnRol, 
    eliminarUnRol, 
    actualizarUnRol
};
