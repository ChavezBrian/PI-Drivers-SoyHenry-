require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drivers`, {
  logging: false, 
  native: false,
  alter: false
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// Desestructura los modelos Driver y Team de sequelize.models
const { Driver, Team } = sequelize.models;

// Establece una relación de muchos a muchos entre Driver y Team utilizando un modelo intermedio "Driver_Team"
// La opción { through: "Driver_Team", timestamps: false } especifica el modelo intermedio y desactiva el registro de timestamps.
Driver.belongsToMany(Team, { through: "Driver_Team", timestamps: false });

// Establece la relación inversa de muchos a muchos desde Team hacia Driver utilizando el mismo modelo intermedio "Driver_Team"
// También desactiva el registro de timestamps.
Team.belongsToMany(Driver, { through: "Driver_Team", timestamps: false });


module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};