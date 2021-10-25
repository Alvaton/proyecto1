
module.exports = (sequelize, type) => {
    return sequelize.define('RECURSO', {
        codigorecurso:{
            autoIncrement: true,
            type: type.INTEGER,
            primaryKey: true
        },
        tipoinventario: {
          type: type.INTEGER,
          allowNull: false
        },
        serial: {
          type: type.STRING,
          allowNull: true
        },
        descripcion: {
            type: type.STRING,
            allowNull: false
        },
        centro: {
            type: type.STRING,
            allowNull: false
        },
        marca: {
            type: type.STRING,
            allowNull: false
        },
        direccionMac1: {
            type: type.STRING,
            allowNull: true
        },
        direccionMac2: {
            type: type.STRING,
            allowNull: true
        },
        almacen: {
            type: type.STRING,
            allowNull: false
        },
        cantidad:{
            type: type.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}