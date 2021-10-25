const db = require('../mysql/conexionMysql');

async function obtenerTodosLosTipInv(req,res){
    const todosTipInv = await db.TipInv.findAll();
    return res.send(todosTipInv);
}

async function insertarUnTipInv(req, res){
    const tipInvCreado = await db.TipInv.create(req.body);
    return res.send(tipInvCreado);
}

async function actualizarUnTipInv(req, res){
    const params = req.body;
    const codigoinventario = req.params.id;
    const actualizados = await db.TipInv.update(
        params,
        { where: { codigoinventario: codigoinventario } }
      );
    return res.send(actualizados);
}

async function eliminarUnTipInv(req, res){
    console.log(req.params.id);
    const codigoinventario = req.params.id;
    try {
        const tipInvEliminado = await db.TipInv.destroy({
            where: {
                codigoinventario : codigoinventario
            }
        });
        res.send({response:'Eliminado exitosamente'});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {obtenerTodosLosTipInv, insertarUnTipInv, eliminarUnTipInv, actualizarUnTipInv};