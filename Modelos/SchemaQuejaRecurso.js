
module.exports = (sequelize, type) => {
    return sequelize.define('QUEJA_RECURSO', {
        ordenno:{
            type: type.STRING,
            primaryKey: true
        },
        codigorecurso: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        cantidad: {
            type: type.INTEGER,
            allowNull: false
        },
        serialaretirar:{
            type: type.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}