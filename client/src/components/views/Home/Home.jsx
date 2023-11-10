import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getDrivers,
  getTeams,
  changePage,
  filterTeam,
  filterOrigin,
  filterOrderName
} from "../../../redux/actions/actions"; // Importación de acciones y componentes relacionados
import Cards from '../../cards/Cards' // Importación del componente Cards
import "./Home.css"

const Home = () => {
  const dispatch = useDispatch(); // Obtiene la función de despacho de Redux
  const drivers = useSelector(state => state.drivers); // Obtiene la lista de conductores desde el estado global
  const teams = useSelector(state => state.teams); // Obtiene la lista de equipos desde el estado global
  const currentPage = useSelector(state => state.currentPage); // Obtiene el número de página actual desde el estado global

  useEffect(() => {
    // Se ejecuta cuando el componente se monta
    dispatch(getDrivers()); // Llama a la acción getDrivers para cargar la lista de conductores
    dispatch(getTeams()); // Llama a la acción getTeams para cargar la lista de equipos
  }, [])

  const pagination = (event) => {
    dispatch(changePage(event.target.name)); // Llama a la acción changePage con el nombre de la página (prev o next)
  }

  const filter = (event) => {
    console.log(event.target.value); // Imprime el valor seleccionado en el filtro

    // Según el nombre del filtro, llama a la acción correspondiente con el valor seleccionado
    if (event.target.name === "filter-teams") dispatch(filterTeam(event.target.value))
    if (event.target.name === "filter-origin") dispatch(filterOrigin(event.target.value))
    if (event.target.name === "filter-order-name") dispatch(filterOrderName(event.target.value))
  }

  return (
    <div>
      <div className="home-filter">
        <div className="home-page"><h2>Page N°{currentPage + 1}</h2></div> {/* Muestra el número de página actual */}
        <div className="filters">
          <button onClick={pagination} name="prev" className="select" >{"Previus page"}</button> {/* Botón para ir a la página anterior */}

          <select name="filter-origin" onChange={filter} className="select">
            <option value="all-drivers">All Drivers</option>
            <option value="created">Created</option>
            <option value="api">API</option>
          </select> {/* Selector de origen de los conductores */}

          <select name="filter-teams" onChange={filter} className="select">
            <option value="------">Select team</option>
            {teams?.map((team, index) =>
              <option key={index} value={team}>{team}</option>
            )}
          </select> {/* Selector de equipos */}

          <select name="filter-order-name" onChange={filter} className="select" >
            <option value="------">Order by name</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select> {/* Selector para ordenar por nombre */}

          <button onClick={pagination} name="next" className="select" >{"Next page"}</button> {/* Botón para ir a la página siguiente */}
        </div>
      </div>
      
      <div>
        <Cards drivers={drivers} /> {/* Renderiza el componente Cards y pasa la lista de conductores como propiedad */}
      </div>
    </div>
  )
}

export default Home;
