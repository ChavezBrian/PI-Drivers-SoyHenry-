// Importa el objeto Router de Express
const { Router } = require("express");

// Importa las rutas específicas para conductores y equipos
const driverRoutes = require("./driverRoutes");
const teamRoutes = require("./teamRoutes");

// Crea un objeto Router llamado router
const router = Router();

// Utiliza las rutas específicas para conductores y equipos con prefijos
router.use("/drivers", driverRoutes);  // Rutas relacionadas con conductores
router.use("/teams", teamRoutes);      // Rutas relacionadas con equipos

// Exporta el objeto router para ser utilizado en otros archivos
module.exports = router;
