// Importa las dependencias necesarias para el servidor Express
const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

// Crea una instancia del servidor Express
const server = express();

// Middlewares:
// - Morgan: Logger para registrar las solicitudes en la consola
server.use(morgan("dev"));
// - Express.json(): Middleware para parsear el cuerpo de las solicitudes en formato JSON
server.use(express.json());
// - CORS: Middleware para habilitar el intercambio de recursos entre orígenes
server.use(cors());

// Utiliza el enrutador definido en "./routes/index"
server.use(router);

// Exporta la instancia del servidor Express para su uso en otros archivos
module.exports = server;
