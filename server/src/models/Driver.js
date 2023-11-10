// Importa el objeto DataTypes de Sequelize para definir tipos de datos
const { DataTypes } = require('sequelize');

// Exporta una función que define el modelo "Driver" en la base de datos
module.exports = (sequelize) => {
  sequelize.define('Driver', {
    // Define la columna 'id' como un UUID con valor predeterminado generado automáticamente
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    // Define la columna 'name' como una cadena de texto con longitud máxima de 15 caracteres, no nula y con validación de no estar vacía
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Name required',
        }
      },
    },
    // Define la columna 'lastname' de manera similar a 'name'
    lastname: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Lastname required',
        }
      },
    },
    // Define la columna 'description' como una cadena de texto con longitud máxima de 100 caracteres, no nula y con validación de no estar vacía
    description: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Descripcion required',
        }
      },
    },
    // Define la columna 'image' como una cadena de texto (URL) con valor predeterminado y validación de ser una URL
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://img.freepik.com/premium-photo/f1-driver-waiting-race-begin-formula-1-poster-concept-generative-ai_117038-4284.jpg",
      validate: {
        isUrl: {
          msg: 'Must be an URL',
        }
      }
    },
    // Define la columna 'nacionality' como una cadena de texto con longitud máxima de 10 caracteres, no nula y con validación de no estar vacía
    nationality: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Nationality required',
        }
      },
    },
    // Define la columna 'birthdate' como una cadena de texto con longitud máxima de 10 caracteres, no nula y con validación de no estar vacía
    birthdate: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Birthdate required',
        }
      },
    }
  }, {
    // Configuración adicional del modelo:
    freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
    timestamps: false // Desactiva el registro de timestamps (createdAt, updatedAt)
  });
};
