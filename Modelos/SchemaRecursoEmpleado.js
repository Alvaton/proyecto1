
module.exports = (sequelize, type) => {
    return sequelize.define('RECURSO_EMPLEADO', {
        codigoempleado: {
            type: type.INTEGER,
            primaryKey: true
        },
        codigorecurso:{
            type: type.INTEGER,
            primaryKey: true
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