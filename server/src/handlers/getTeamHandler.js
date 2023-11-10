// Importa el controlador getTeamsController de "../controllers/teamControllers"
const getTeamsController = require("../controllers/teamControllers");

// Define un controlador llamado getTeamHandler para manejar las solicitudes de obtener equipos
const getTeamHandler = async (req, res) => {
    try {
        // Obtiene la información de los equipos utilizando el controlador getTeamsController
        const teams = await getTeamsController();
        
        // Envía una respuesta con el estado 200 y la información de los equipos en formato JSON
        res.status(200).json(teams);
    } catch (error) {
        // Manejo de errores: Envía una respuesta con el estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ error: error.message });
    }
};

// Exporta el controlador getTeamHandler para ser utilizado en otros archivos
module.exports = getTeamHandler;
