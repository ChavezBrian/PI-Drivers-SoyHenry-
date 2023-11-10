// Importa el objeto Router de Express
const { Router } = require("express");

// Importa el controlador getTeamHandler para manejar las solicitudes relacionadas con equipos
const getTeamHandler = require("../handlers/getTeamHandler");

// Crea un objeto Router llamado teamsRoutes
const teamsRoutes = Router();

// Define la ruta para obtener información sobre equipos utilizando el controlador getTeamHandler
teamsRoutes.get("/", getTeamHandler);

// Exporta el objeto teamsRoutes para ser utilizado en otros archivos
module.exports = teamsRoutes;
