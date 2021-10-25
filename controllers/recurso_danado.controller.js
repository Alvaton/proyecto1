const db = require('../mysql/conexionMysql');
const moment = require('moment');

async function obtenerTodosLosRecursosDanados(req,res){
    const todosRoles = await db.RecursoDanado.findAll();
    return res.send(todosRoles);
}

async function filtro(req,res){
    db.RecursoDanado.hasMany(db.Empleado, {foreignKey: 'codigoempleado'})
    db.Empleado.belongsTo(db.RecursoDanado, {foreignKey: 'codigoempleado'})
    
    db.RecursoDanado.hasMany(db.Recurso, {foreignKey: 'codigorecurso'})
    db.Recurso.belongsTo(db.RecursoDanado, {foreignKey: 'codigorecurso'})
    
    console.log(req.body);
    
    const recursosDanados = await db.RecursoDanado.findAll({
        include: [ {model: db.Empleado}, {model: db.Recurso}],
        where: req.body
    });
    return res.send(recursosDanados);
}

async function insertarUnRecursoDanado(req, res){
    const { codigorecurso, codigoempleado, cantidad } = req.body;
    try {    
        await db.$sequelize.transaction(async function (transaction) {

            let recursoDanadoCreado = await db.RecursoDanado.findOne({ 
                where: {
                    codigorecurso,
                    codigoempleado
                }  
            });
            if(!recursoDanadoCreado){
                recursoDanadoCreado = await db.RecursoDanado.create(
                    {
                        ...req.body,
                        fecha: moment().format()
                    }, { transaction });
            }else{
                await db.RecursoDanado.update({ 
                    cantidad: recursoDanadoCreado.cantidad + cantidad 
                },{ 
                    where: {
                        codigorecurso,
                        codigoempleado
                    }
                , transaction });
            }
            const recursoEmpleadoRecord = await db.RecursoEmpleado.findOne({ 
                where: {
                    codigorecurso,
                    codigoempleado
                }
            });
            if(!recursoEmpleadoRecord){ throw Error('No se encontró recurso empleado')}
            const condicion = {
                where:{
                    codigorecurso,
                    codigoempleado
                }
            };
            await db.RecursoEmpleado.update({ 
                cantidad: recursoEmpleadoRecord.cantidad - cantidad 
            },{ ...condicion, transaction });
            return recursoDanadoCreado;
        });
        return res.send({ status: true, message: 'Actualizado exitosamente'});
    } catch (error) {
        console.log(error);
        return res.send({ status: false, message: 'Ha ocurrido un error'});
    }
}

async function eliminarUnRecursoDanado(req, res){
    const codigorol = req.params.id;
    try {
        const recursoDanadoEliminado = await db.RecursoDanado.destroy({
            where: {
                codigorol : codigorol
            }
        });
        res.send({response:'Eliminado exitosamente'});
    } catch (error) {
    }
}

module.exports = {
    obtenerTodosLosRecursosDanados, 
    insertarUnRecursoDanado, 
    eliminarUnRecursoDanado,
    filtro
};
