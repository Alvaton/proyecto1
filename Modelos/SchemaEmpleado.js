
module.exports = (sequelize, type) => {
    return sequelize.define('EMPLEADO', {
        codigoempleado:{
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ibm: {
          type: type.STRING,
        },
        nombres: {
          type: type.STRING
        },
        apellidos: {
            type: type.STRING
        },
        celular: {
            type: type.STRING
        },
        rol: {
            type: type.INTEGER
        },
        password: {
            type: type.STRING
        },
    }, {
        timestamps: false,
        freezeTableName: true
    });
}