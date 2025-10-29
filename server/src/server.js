const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const routes = require('./routes')
const envioEmailController = require("./controllers/EnvioEmailControllers");
const listarCompromissos = require("./controllers/ListarCompromissosControllers")
require ('dotenv').config()

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3124', 'www.gestaoprojetos.sde.ce.gov.br', 'http://www.gestaoprojetos.sde.ce.gov.br',  'https://www.gestaoprojetos.sde.ce.gov.br', 'https://gestaoprojetos.sde.ce.gov.br']
}))

const port = process.env.PORT

routes(app)

envioEmailController.monitorarCompromissos();
listarCompromissos.listarCompromissos();

app.listen(port, () => console.log(`O servidor está On`))

module.exports = app