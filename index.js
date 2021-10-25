require('rootpath')();
require('dotenv').config();

const express = require('express')
const app = express()
const port = 3000
const routesRol = require('./routes/rol'); // import the routes
const routesAuth = require('./routes/auth'); // import the routes
const routesTipInv = require('./routes/tipInv'); // import the routes
const routesRecurso = require('./routes/recurso'); // import the routes
const routesEmpleado = require('./routes/empleado'); // import the routes
const routesRecursoEmpleado = require('./routes/recurso_empleado'); // import the routes
const routesQueja = require('./routes/queja'); // import the routes
const routesQuejaRecurso = require('./routes/queja_recurso')
const routesRecDan = require('./routes/recurso_danado');
const cors = require('cors');

app.use(cors())

app.use(express.json());

app.use('/roles', routesRol); //to use the routes
app.use('/auth', routesAuth); //to use the routes
app.use('/tipInv', routesTipInv); //to use the routes
app.use('/recurso', routesRecurso); //to use the routes
app.use('/empleado', routesEmpleado) //to use the routes
app.use('/recEmpl', routesRecursoEmpleado) //to use the routes
app.use('/queja', routesQueja) //to use the routes
app.use('/quejaRecurso', routesQuejaRecurso) //to use the routes
app.use('/recDan', routesRecDan) //to use the routes

app.get('/', (req, res) => {
  res.send('Hola alvaro!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})