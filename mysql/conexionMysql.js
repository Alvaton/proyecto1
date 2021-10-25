const RolModel = require('../Modelos/SchemaRol');
const EmpleadoModel = require('../Modelos/SchemaEmpleado')
const TipInvModel = require('../Modelos/SchemaTipInv')

const RecursoModel = require('../Modelos/SchemaRecurso')
const RecursoEmpleadoModel = require('../Modelos/SchemaRecursoEmpleado')
const QuejaRecursoModel = require('../Modelos/SchemaQuejaRecurso');
const QuejaModel = require('../Modelos/SchemaQueja');

const RecursoDanadoModel = require('../Modelos/SchemaRecursoDanado');

const Sequelize = require('sequelize');
const {Op} = require('sequelize')
console.log(process.env.HOSTDB);
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERDB, process.env.PASSWORD, {
    host: process.env.HOSTDB,
    dialect: 'mysql',
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $gte: Op.gte,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like,
        $between: Op.between
    }
});
  
const Rol = RolModel(sequelize, Sequelize)
const Empleado = EmpleadoModel(sequelize, Sequelize)
const TipInv = TipInvModel(sequelize, Sequelize)
const Recurso = RecursoModel(sequelize, Sequelize)
const RecursoEmpleado = RecursoEmpleadoModel(sequelize, Sequelize)
const Queja = QuejaModel(sequelize, Sequelize)
const QuejaRecurso = QuejaRecursoModel(sequelize, Sequelize)
const RecursoDanado = RecursoDanadoModel(sequelize, Sequelize)

const db = {};
db.Rol = Rol;
db.Empleado = Empleado;
db.TipInv = TipInv;
db.Recurso = Recurso;
db.RecursoEmpleado = RecursoEmpleado;
db.Queja = Queja;
db.RecursoDanado = RecursoDanado;
db.QuejaRecurso = QuejaRecurso;

// Relations
//db.Empleado.hasMany(db.RecursoEmpleado, { onDelete: 'CASCADE' });
db.RecursoEmpleado.belongsTo(db.Empleado, {foreignKey: 'codigoempleado'});
//db.Recurso.hasMany(db.RecursoEmpleado, { onDelete: 'CASCADE' });
db.RecursoEmpleado.belongsTo(db.Recurso, { foreignKey: 'codigorecurso'});

db.QuejaRecurso.belongsTo(db.Queja, { foreignKey: 'ordenno'});
db.QuejaRecurso.belongsTo(db.Recurso, { foreignKey: 'codigorecurso'});

db.Queja.belongsTo(db.Empleado, { foreignKey: 'codigoempleado'});

db.RecursoDanado.belongsTo(db.Empleado, {foreignKey: 'codigoempleado'});
db.RecursoDanado.belongsTo(db.Recurso, { foreignKey: 'codigorecurso'});

sequelize.sync().then(()=>{
    console.log('Sincronizado');
});

db.$sequelize = sequelize;

module.exports = db;