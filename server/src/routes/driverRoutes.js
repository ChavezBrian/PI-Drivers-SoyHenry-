// Importa el objeto Router de Express
const { Router } = require('express');

// Importa los controladores y handlers relacionados con los conductores
const postDriverHandler = require("../handlers/postDriverHandler");
const getDriversHandler = require('../handlers/getDriversHandler');
const driverByIdHandler = require('../handlers/getDriverByIdHandler');

// Crea un objeto Router llamado driversRoutes
const driversRoutes = Router();

// Define las rutas para los controladores correspondientes
driversRoutes.get("/", getDriversHandler);      // Ruta para obtener todos los conductores
driversRoutes.get("/:id", driverByIdHandler);   // Ruta para obtener un conductor por ID
driversRoutes.post("/", postDriverHandler);     // Ruta para crear un nuevo conductor

// Exporta el objeto driversRoutes para ser utilizado en otros archivos
module.exports = driversRoutes;
