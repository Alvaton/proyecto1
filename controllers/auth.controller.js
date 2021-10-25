const db = require('../mysql/conexionMysql');
const { Op } = require("sequelize");

async function signIn( req, res) {  
    const {ibm, password} = req.body;
    const itemFound =  await db.Empleado.findAll({
    where:    {
            [Op.and]:[
                { ibm },
                { password }
            ]
        }
    });
    res.send(itemFound)
}

module.exports = { signIn }