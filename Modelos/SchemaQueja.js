
module.exports = (sequelize, type) => {
    return sequelize.define('QUEJA', {
        ordenno:{
            type: type.STRING,
            primaryKey: true
        },
        codigoempleado:{
            type: type.INTEGER,
            allowNull: false
        },
        nombres: {
          type: type.STRING,
          allowNull: false
        },
        descripcion: {
            type: type.STRING,
            allowNull: true
        },
        fecha: {
            type: type.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}