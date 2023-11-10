import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { searchDriver, refresh } from "../../redux/actions/actions";
import "./Nav.css"

export default function Nav() {
    // Obtiene la función `dispatch` para despachar acciones de Redux
    const dispatch = useDispatch()
    
    // Estado local para almacenar el valor del input de búsqueda
    const [input, setInput] = useState("");
    
    // Función para manejar cambios en el input de búsqueda
    const handleInput = (event) => {
        setInput(event.target.value)
    }

    // Función para manejar la acción de búsqueda al hacer clic en el botón de búsqueda
    const handleButton = (event) => {
        event.preventDefault();
        // Despacha la acción `searchDriver` con el valor del input como parámetro
        dispatch(searchDriver(input))
        // Limpia el valor del input
        document.getElementById("search").value = "";
    }

    // Función para refrescar la lista de conductores
    const Refresh = () => {
        // Despacha la acción `refresh` para restablecer la lista de conductores
        dispatch(refresh())
    }

    return (
        <nav>
            <ul className="container">
                <li className="li-img">
                    <Link to="/" >
                        <img src="http://127.0.0.1:5500/cr-pi-drivers-main/client/src/img/F1.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link onClick={Refresh} to="/home" className="home">Home</Link>
                </li>
                <li>
                    <Link to="/form" className="home">Create Driver</Link>
                </li>
                <li className="li">
                    <section>
                        <form autoComplete="off">
                            <div>
                                <input onChange={handleInput} type="text" id="search" placeholder="Search a driver..." />
                                <button onClick={handleButton} className="custom-button">
                                    <img src="https://cdn-icons-png.flaticon.com/128/751/751381.png" alt="Cerrar" />
                                </button>
                            </div>
                        </form>
                    </section>
                </li>
            </ul>
        </nav>
    )
}
