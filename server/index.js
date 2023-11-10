// Importa la librería axios para hacer solicitudes HTTP, el servidor y la conexión a la base de datos
const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');

// Puerto en el que se ejecutará el servidor
const PORT = 3001;

// Sincroniza la base de datos, creando tablas si no existen (force: true)
conn.sync({ force: false }).then(() => {
  // Inicia el servidor y escucha en el puerto definido
  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));

