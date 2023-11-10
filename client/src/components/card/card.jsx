import { NavLink } from "react-router-dom"; // Importa los componentes Link y NavLink de React Router para la navegación
import "./card.css"; // Importa los estilos CSS para el componente Card

function Card({ id, image, name, lastname, team }) {
  // El componente Card toma varias propiedades como argumento que representan la información del conductor

  return (
    <div className="card-cont">
      {/* Crea un contenedor div con la clase "card-cont" para la tarjeta del conductor */}
      <NavLink className="card-button" to={`/detail/${id}`}>
        {/* Utiliza NavLink para crear un enlace que dirige a la página de detalles del conductor con su ID */}
        <h2>Name: {name} {lastname}</h2> {/* Muestra el nombre y apellido del conductor */}
        <img className="card-img" src={image} alt={name} /> {/* Muestra la imagen del conductor con el nombre como texto alternativo (alt) */}
      </NavLink>
      <h3>Teams: {team}</h3> {/* Muestra el equipo del conductor */}
    </div>
  );
}

export default Card;
