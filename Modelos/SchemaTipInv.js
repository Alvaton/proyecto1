
module.exports = (sequelize, type) => {
    return sequelize.define('TIPO_DE_INVENTARIO', {
        codigoinventario:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
          type: type.STRING,
        }
    }, {
        timestamps: false,
        freezeTableName: true
    });
}