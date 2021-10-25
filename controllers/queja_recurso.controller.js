const db = require('../mysql/conexionMysql');


async function filtro(req, res){
    db.QuejaRecurso.hasMany(db.Queja, {foreignKey: 'ordenno'})
    db.Queja.belongsTo(db.QuejaRecurso, {foreignKey: 'ordenno'})

    db.QuejaRecurso.hasMany(db.Recurso, {foreignKey: 'codigorecurso'})
    db.Recurso.belongsTo(db.QuejaRecurso, {foreignKey: 'codigorecurso'})
    
    const todasQuejasRecursos = await db.QuejaRecurso.findAll({
        include: [ {model: db.Queja}, {model: db.Recurso}],
        where: req.body
    });
    return res.send(todasQuejasRecursos);
}

async function obtenerTodasLasQuejaRecurso(req,res){
    const todasQuejaRecurso = await db.QuejaRecurso.findAll();
    return res.send(todasQuejaRecurso);
}

async function crearQuejaRecurso(req,res){
    const quejaRecursoCreada = await db.QuejaRecurso.create(req.body);
    return res.send(quejaRecursoCreada);
}

async function actualizarQuejaRecurso(req, res){
    const actualizar =  req.body;
    const ordenno =  req.params.ordenno;
    const codigorecurso = req.params.codigorecurso;
    const condicion = {
        where: {
            ordenno,
            codigorecurso
        }
    }
    const quejaRecursoActualizada = await db.QuejaRecurso.update(actualizar,condicion)
    return res.send(quejaRecursoActualizada);
}

async function eliminarQuejaRecurso(req,res){
    const ordenno = req.params.ordenno;
    const codigorecurso = req.params.codigorecurso;
    const condicion = {
        where: {
            ordenno,
            codigorecurso
        }
    }
    const quejaRecursoEliminada = await db.QuejaRecurso.destroy(condicion);
    res.send({response:'Eliminado exitosamente'});
}

module.exports = { filtro, obtenerTodasLasQuejaRecurso, crearQuejaRecurso, actualizarQuejaRecurso, eliminarQuejaRecurso }