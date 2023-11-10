// Importa el objeto Sequelize para la conexión a la base de datos
const { Sequelize } = require("sequelize");
// Importa los modelos Driver y Team de "../db"
const { Driver, Team } = require("../db");
// Importa la librería axios para realizar solicitudes HTTP
const axios = require("axios");

// Define una función asincrónica llamada createDriver que toma un objeto de detalles del conductor como argumento
const createDriver = async ({
    Teams,  // Extrae el array Teams del objeto de detalles
    ...driverDetails  // Extrae el resto de los detalles del conductor
}) => {
    // Verifica si todos los valores en driverDetails son truthy y si Teams no está vacío
    if (!Object.values(driverDetails).every(Boolean) || !Teams.length) {
        // Lanza un error si falta algún dato
        throw new Error("Missing data");
    }

    // Crea un nuevo conductor en la base de datos utilizando el modelo Driver y los detalles proporcionados
    const newDriver = await Driver.create(driverDetails);

    // Busca en la base de datos los equipos cuyos nombres estén en el array Teams
    const teamsDB = await Team.findAll({
        where: { name: { [Sequelize.Op.in]: Teams } }
    });

    // Asocia el nuevo conductor con los equipos encontrados en la base de datos
    await newDriver.addTeam(teamsDB);

    // Retorna el nuevo conductor creado
    return newDriver;
};

// Define una función asincrónica llamada getDriversDB que obtiene los conductores de la base de datos
const getDriversDB = async () => {
    // Utiliza el modelo Driver para buscar todos los conductores en la base de datos
    const driversDB = await Driver.findAll({
        // Incluye la asociación con el modelo Team, con ciertos atributos y sin atributos en la tabla intermedia
        include: {
            model: Team,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        },
    });

    // Mapea los conductores encontrados para devolver un formato específico de datos
    return driversDB.map(({ id, name, lastname, description, image, nationality, birthdate, Teams }) => ({
        id,
        name,
        lastname,
        description,
        image,
        nationality,
        birthdate,
        Teams: Teams.map(team => team.name), // Mapea los equipos para obtener solo los nombres
    }));
};

// Define una función asincrónica llamada getDriversApi que obtiene conductores desde una API externa
const getDriversApi = async () => {
    // Realiza una solicitud HTTP GET a la URL http://localhost:5000/drivers utilizando axios
    const { data } = await axios("http://localhost:5000/drivers");

    // Mapea los datos recibidos para devolver un formato específico de datos
    return data.map(({ id, name, description, image, nationality, dob, teams }) => ({
        // Mapea y formatea los atributos de interés
        id,
        name: name.forename,
        lastname: name.surname,
        description,
        // Usa la URL de la imagen si está presente, de lo contrario, utiliza una imagen predeterminada
        image: image.url.length ? image.url : "https://img.freepik.com/premium-photo/f1-driver-waiting-race-begin-formula-1-poster-concept-generative-ai_117038-4284.jpg",
        nationality,
        birthdate: dob,
        // Divide la cadena de equipos en un array, si existe, utilizando la coma como separador
        Teams: teams ? teams.split(/\s*,\s*/).join(', ') : '',
    }));
};

// Define una función asincrónica llamada getDrivers que combina conductores de la base de datos y de una API externa
const getDrivers = async (name) => {
    // Combina los conductores obtenidos de la base de datos y de la API externa en un solo array
    const drivers = [...await getDriversDB(), ...await getDriversApi()];

    // Si se proporciona un nombre como argumento
    if (name) {
        // Filtra los conductores cuyo nombre o apellido incluye (case-insensitive) la cadena proporcionada
        const driverFound = drivers.filter(
            d => d.name.toLowerCase().includes(name.toLowerCase()) || d.lastname.toLowerCase().includes(name.toLowerCase())
        );
        // Si no se encuentra ningún conductor, lanza un error
        if (!driverFound.length) throw new Error(`Driver with name '${name}' not found`);
        // Retorna los primeros 15 conductores encontrados
        return driverFound.slice(0, 15);
    }

    // Si no se proporciona un nombre, simplemente retorna todos los conductores
    return drivers;
};

// Define una función asincrónica llamada getDriverById que busca un conductor por su ID
const getDriverById = async (id) => {
    // Verifica si el ID proporcionado no es un número
    const drivers = isNaN(id) ? await getDrivers() : await getDriversApi();

    // Busca el conductor con el ID proporcionado en el array de conductores obtenido
    const driverFound = drivers.find(driver => driver.id == id);

    // Si no se encuentra el conductor, lanza un error
    if (!driverFound) throw new Error("The driver was not found");

    // Retorna el conductor encontrado
    return driverFound;
};

// Exporta las funciones createDriver, getDrivers y getDriverById para ser utilizadas en otros archivos
module.exports = { createDriver, getDrivers, getDriverById };
