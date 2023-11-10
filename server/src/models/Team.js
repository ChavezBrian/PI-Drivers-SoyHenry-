// Importa el objeto DataTypes de Sequelize para definir tipos de datos
const { DataTypes } = require('sequelize');

// Exporta una función que define el modelo "Team" en la base de datos
module.exports = (sequelize) => {
    sequelize.define("Team", {
        // Define la columna 'id' como un UUID con valor predeterminado generado automáticamente
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        // Define la columna 'name' como una cadena de texto, no nula, con validación de no estar vacía
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'The name is required',
                }
            }
        }
    }, {
        // Configuración adicional del modelo:
        freezeTableName: true, // Evita que Sequelize pluralice el nombre de la tabla
        timestamps: false // Desactiva el registro de timestamps (createdAt, updatedAt)
    });
};
