import { Link } from "react-router-dom"; // Importa el componente Link de React Router, que permite crear enlaces de navegación
import "./landingpage.css"; // Importa los estilos CSS asociados a esta página

export default function LandingPage() {
    return (
        <div className="landing-cont"> {/* Crea un contenedor div con la clase "landing-cont" */}
            <div className="title-cont"> {/* Crea un contenedor div con la clase "title-cont" */}
                <h1 className="title">WELCOME TO F1!</h1> {/* Muestra un título "WELCOME TO F1!" con la clase "title" */}
                <Link to="/home"><button>Go</button></Link> {/* Crea un enlace de navegación a la ruta "/home" y muestra un botón "Start" */}
            </div>
        </div>
    );
}
