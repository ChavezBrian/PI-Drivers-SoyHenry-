// Importa la función getDrivers del controlador driverControllers
const { getDrivers } = require("../controllers/driverControllers");

// Define un controlador llamado getDriversHandler para manejar las solicitudes de obtener conductores
const getDriversHandler = async (req, res) => {
    try {
        // Extrae el nombre de la consulta de la solicitud
        const { name } = req.query;
        
        // Obtiene la información de los conductores utilizando la función getDrivers
        const drivers = await getDrivers(name);
        
        // Envía una respuesta con el estado 200 y la información de los conductores en formato JSON
        res.status(200).json(drivers);
    } catch (error) {
        // Manejo de errores: Envía una respuesta con el estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ error: error.message });
    }
};

// Exporta el controlador getDriversHandler para ser utilizado en otros archivos
module.exports = getDriversHandler;
