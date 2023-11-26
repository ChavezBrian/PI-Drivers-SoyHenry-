import Card from "../card/card"; // Importa el componente Card, que se utilizará para representar a cada conductor
import "./cards.css"; // Importa los estilos CSS para el componente Cards

function Cards({ drivers }) {
  // El componente Cards toma un prop llamado "drivers", que es una lista de conductores que se representarán en tarjetas

  return (
    <div className="cards-cont">
      {/* Crea un contenedor div con la clase "cards-cont" para contener las tarjetas de los conductores */}
      {drivers?.map(driver => {
        // Utiliza el método "map" para iterar sobre la lista de conductores y representar cada uno de ellos
        return (
          <Card
            key={driver.id} // Asigna una clave única a la tarjeta, que generalmente se basa en el ID del conductor
            id={driver.id} // Propiedad que almacena el ID del conductor
            name={driver.name} // Propiedad que almacena el nombre del conductor
            lastname={driver.lastname} // Propiedad que almacena el apellido del conductor
            image={driver.image} // Propiedad que almacena la URL de la imagen del conductor
            team={driver.Teams} // Propiedad que almacena la nacionalidad del conductor
          />
        );
      })}
      {/* Cierra el mapeo y representa una tarjeta (componente Card) para cada conductor */}
    </div>
  );
}

export default Cards;


