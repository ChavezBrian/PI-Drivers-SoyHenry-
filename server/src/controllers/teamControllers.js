// Importa el modelo Team de "../db" y la librería axios para realizar solicitudes HTTP
const { Team } = require("../db");
const axios = require("axios");

// Define un controlador llamado getTeamsController para obtener los equipos
const getTeamsController = async (req, res) => {
  // Busca todos los equipos en la base de datos
  const teamsDB = await Team.findAll();

  // Si no hay equipos en la base de datos
  if (!teamsDB.length) {
    // Realiza una solicitud HTTP GET a la URL "http://localhost:5000/drivers"
    const { data } = await axios("http://localhost:5000/drivers");

    // Extrae los nombres de los equipos de los datos obtenidos
    const teamsData = data.reduce((acc, driver) => {
      if (driver.teams) {
        const teamSplit = driver.teams.split(/\s*,\s*/);
        acc.push(...teamSplit);
      }
      return acc;
    }, []);

    // Elimina duplicados manteniendo solo valores únicos
    const teamUnique = [...new Set(teamsData)];

    // Utiliza Promise.all para ejecutar operaciones asincrónicas para cada equipo único
    await Promise.all(
      teamUnique.map(async (team) => {
        // Busca o crea un equipo en la base de datos con el nombre del equipo único
        await Team.findOrCreate({
          where: { name: team },
        });
      })
    );

    // Retorna el array de nombres de equipos únicos
    return teamUnique;
  }

  // Si hay equipos en la base de datos, retorna los nombres de los equipos
  return teamsDB.map((team) => team.name);
};

// Exporta el controlador getTeamsController para ser utilizado en otros archivos
module.exports = getTeamsController;
