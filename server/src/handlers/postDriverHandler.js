// Importa la función createDriver del controlador driverControllers
const { createDriver } = require("../controllers/driverControllers");

// Define un controlador llamado postDriverHandler para manejar las solicitudes de creación de un nuevo conductor
const postDriverHandler = async (req, res) => {
    try {
        // Extrae los datos del cuerpo de la solicitud
        const data = req.body;

        // Crea un nuevo conductor utilizando la función createDriver y los datos proporcionados
        const newDriver = await createDriver(data);

        // Envía una respuesta con el estado 201 (Created) y la información del nuevo conductor en formato JSON
        res.status(201).json(newDriver);
    } catch (error) {
        // Manejo de errores: Envía una respuesta con el estado 404 (Not Found) y un mensaje de error en formato JSON
        res.status(404).json({ error: error.message });
    }
};

// Exporta el controlador postDriverHandler para ser utilizado en otros archivos
module.exports = postDriverHandler;
