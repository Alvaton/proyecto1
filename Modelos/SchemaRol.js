
module.exports = (sequelize, type) => {
    return sequelize.define('ROL', {
        codigorol:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
          type: type.STRING,
        },
        descripcion: {
          type: type.STRING
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
}