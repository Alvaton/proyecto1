
module.exports = (sequelize, type) => {
    return sequelize.define('RECURSO_DANADO', {
        codigorecurso:{
            type: type.INTEGER,
            primaryKey: true
        },
        codigoempleado:{
            type: type.INTEGER,
            primaryKey: true,
        },
        cantidad:{
            type: type.INTEGER,
            allowNull: false
        },
        observacion: {
          type: type.STRING,
          allowNull: true
        },
        fecha: {
          type: type.DATE,
          allowNull: false
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
}