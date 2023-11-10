// Importa la función getDriverById del controlador driverControllers
const { getDriverById } = require("../controllers/driverControllers");

// Define un controlador llamado DriverByIdHandler para manejar las solicitudes de un conductor por ID
const DriverByIdHandler = async (req, res) => {
    try {
        // Extrae el ID del parámetro de la solicitud
        const { id } = req.params;
        
        // Obtiene la información del conductor por ID utilizando la función getDriverById
        const driver = await getDriverById(id);
        
        // Envía una respuesta con el estado 200 y la información del conductor en formato JSON
        res.status(200).json(driver);
    } catch (error) {
        // Manejo de errores: Envía una respuesta con el estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ error: error.message });
    }
};

// Exporta el controlador DriverByIdHandler para ser utilizado en otros archivos
module.exports = DriverByIdHandler;
