const db = require('../mysql/conexionMysql');

async function existeAsignacion(req, res){
    console.log(req.body);
    const filtrados =  await db.RecursoEmpleado.findAll({
        where:
        {
            ...req.body
        }
    })
    return res.send(filtrados);
}

async function obtenerTodosLosRecursos(req, res){
    db.Empleado.hasMany(db.RecursoEmpleado, {foreignKey: 'codigoempleado'})
    db.RecursoEmpleado.belongsTo(db.Empleado, {foreignKey: 'codigoempleado'})


    db.Recurso.hasMany(db.RecursoEmpleado, {foreignKey: 'codigorecurso'})
    db.RecursoEmpleado.belongsTo(db.Recurso, {foreignKey: 'codigorecurso'})

    const todosRE = await db.RecursoEmpleado.findAll({
        include: [{model: db.Recurso}, {model: db.Empleado}]
    });
    return res.send(todosRE);
}

async function filtro(req, res){
    db.Empleado.hasMany(db.RecursoEmpleado, {foreignKey: 'codigoempleado'})
    db.RecursoEmpleado.belongsTo(db.Empleado, {foreignKey: 'codigoempleado'})


    db.Recurso.hasMany(db.RecursoEmpleado, {foreignKey: 'codigorecurso'})
    db.RecursoEmpleado.belongsTo(db.Recurso, {foreignKey: 'codigorecurso'})

    const todosRE = await db.RecursoEmpleado.findAll({
        include: [{model: db.Recurso}, {model: db.Empleado}],
        where: req.body
    });
    return res.send(todosRE);
}

async function insertarUnRecurso(req, res){
    const recursoECreado = await db.RecursoEmpleado.create(req.body);
    return res.send(recursoECreado);
}

async function actualizarUnRecurso(req, res){
    const params = req.body;
    const codigorecurso = req.params.idR;
    const codigoempleado = req.params.idE;
    const condicion = {
        where:{
            codigorecurso,
            codigoempleado
        }
    };
    const recursoEActualizado = await db.RecursoEmpleado.update(params,condicion)
    return res.send(recursoEActualizado);
}


async function eliminarUnRecurso(req, res){
    const codigorecurso = +req.params.idR;
    const codigoempleado = +req.params.idE;

    try {
        const condicion = {
            where:{
                codigorecurso,
                codigoempleado
            }
        };
        await db.$sequelize.transaction(async function (transaction) {
            const recursoEmpleadoEncontrado = await db.RecursoEmpleado.findOne(condicion);
            const recursoEncontrado = await db.Recurso.findOne({
                where:{
                    codigorecurso
                }
            });

            const recursoActualizado = await db.Recurso.update(
            {
                cantidad: recursoEncontrado.cantidad + recursoEmpleadoEncontrado.cantidad
            },
            {
                where:{
                    codigorecurso
                },
                transaction
            });
            const recursoEEliminado = await db.RecursoEmpleado.destroy({
                ...condicion,
                transaction
            });
        });
        res.send({response:'Eliminado exitosamente'});

    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: `Ha ocurrido un error al eliminar el recurso asignado`
        });
    }
}
module.exports = {
    obtenerTodosLosRecursos,
    insertarUnRecurso,
    actualizarUnRecurso,
    eliminarUnRecurso,
    existeAsignacion,
    filtro
}