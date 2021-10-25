const db = require('../mysql/conexionMysql');
const moment = require('moment');

async function obtenerTodasLasQuejas(req, res){
    db.Queja.hasMany(db.Empleado, {foreignKey: 'codigoempleado'})
    db.Empleado.belongsTo(db.Queja, {foreignKey: 'codigoempleado'})
    const todasQuejas = await db.Queja.findAll({
        include: [ {model: db.Empleado}],
        where: {}
    });
    return res.send(todasQuejas);
} 

async function filtro(req, res){
    db.Queja.hasMany(db.Empleado, {foreignKey: 'codigoempleado'})
    db.Empleado.belongsTo(db.Queja, {foreignKey: 'codigoempleado'})
    console.log(req.body);
    const todasQuejas = await db.Queja.findAll({
        include: [ {model: db.Empleado}],
        where: req.body
    });
    return res.send(todasQuejas);
}

async function crearQueja(req,res){
    const { queja, recursos } = req.body;
    try {
        await db.$sequelize.transaction(async function (transaction) {
            const quejaCreada = await db.Queja.create({
                ...queja,
                fecha:  moment().format()
            }, { transaction });
            for(const recurso of recursos){
                await db.QuejaRecurso.create({
                    ordenno: quejaCreada.ordenno,
                    codigorecurso: recurso.codigorecurso,
                    cantidad: recurso.cantidad
                }, { transaction });

                const codigorecurso = recurso.codigorecurso;
                const codigoempleado = queja.codigoempleado;
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
                    cantidad: recursoEmpleadoRecord.cantidad - recurso.cantidad 
                },{ ...condicion, transaction });
            }
            return queja;
        });
        return res.send({ status: true, message: 'Creado exitosamente'});
    } catch (error) {
        console.log(error);
        return res.send({ status: false, message: 'Ha ocurrido un error'});
    }
}

async function actualizarQueja(req,res){
    const { queja, recursos } = req.body;
    try {
        await db.$sequelize.transaction(async function (transaction) {
            const quejaCreada = queja;
            const olderRecursos = await db.QuejaRecurso.findAll({
                where: {
                    ordenno: quejaCreada.ordenno
                }
            });
            
            // DELETE OLDER AND ROLLBACK RECURSOS
            for(const recurso of olderRecursos){
                const codigorecurso = recurso.codigorecurso;
                const codigoempleado = queja.codigoempleado;
                await db.QuejaRecurso.destroy({
                    where: {
                        ordenno: quejaCreada.ordenno,
                        codigorecurso: recurso.codigorecurso,
                    },
                    transaction
                });
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
                    cantidad: recursoEmpleadoRecord.cantidad + recurso.cantidad 
                },{ ...condicion, transaction });
            }
            for(const recurso of recursos){
                const codigorecurso = recurso.codigorecurso;
                const codigoempleado = queja.codigoempleado;
                await db.QuejaRecurso.create({
                    ordenno: quejaCreada.ordenno,
                    codigorecurso: codigorecurso,
                    cantidad: recurso.cantidad
                }, { transaction });
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
                    cantidad: recursoEmpleadoRecord.cantidad - recurso.cantidad 
                },{ ...condicion, transaction });
            }
            return quejaCreada;
        });
        return res.send({ status: true, message: 'Actualizado exitosamente'});
    } catch (error) {
        console.log(error);
        return res.send({ status: false, message: 'Ha ocurrido un error'});
    }
}

async function  eliminarUnaQueja(req, res){
    const ordenno = req.params.id;
    try {
        await db.$sequelize.transaction(async function (transaction) {
            const quejaCreada = await db.Queja.findOne({ 
                where: {
                    ordenno
                }
            });
            const olderRecursos = await db.QuejaRecurso.findAll({
                where: {
                    ordenno
                }
            });

            // DELETE OLDER AND ROLLBACK RECURSOS
            for(const recurso of olderRecursos){
                const codigorecurso = recurso.codigorecurso;
                const codigoempleado = quejaCreada.codigoempleado;
                await db.QuejaRecurso.destroy({
                    where: {
                        ordenno,
                        codigorecurso: recurso.codigorecurso,
                    },
                    transaction
                });
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
                    cantidad: recursoEmpleadoRecord.cantidad + recurso.cantidad 
                },{ ...condicion, transaction });
            }
            await db.Queja.destroy({
                where: {
                    ordenno,
                    codigoempleado: quejaCreada.codigoempleado,
                },
                transaction
            });
        });
        return res.send({ status: true, message: 'Eliminado exitosamente'});

    } catch (error) {
        console.log(error);
        return res.send({ status: false, message: 'Ha ocurrido un error'});
    }
}

module.exports = { obtenerTodasLasQuejas, crearQueja, actualizarQueja,eliminarUnaQueja, filtro }