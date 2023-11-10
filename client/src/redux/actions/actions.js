// Importa los tipos de acciones y la librería Axios para realizar solicitudes HTTP
import { GET_DRIVERS, GET_TEAMS, GET_DRIVER_ID, PAGINATION, SEARCH_DRIVER, REFRESH, FILTER_TEAM, FILTER_ORIGIN, CLEAN_DETAIL, FILTER_ORDER_NAME } from "./actions-types";
import axios from "axios";

// URLs de los servicios web para conductores y equipos
const URL_DRIVERS = "http://localhost:3001/drivers";
const URL_TEAMS = "http://localhost:3001/teams";

// Acción para obtener la lista de conductores
export const getDrivers = () => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para obtener datos de conductores
            const { data } = await axios(URL_DRIVERS);
            
            // Dispatcha la acción con los datos obtenidos
            return dispatch({
                type: GET_DRIVERS,
                payload: data
            });
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}

// Acción para obtener la lista de equipos
export const getTeams = () => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para obtener datos de equipos
            const { data } = await axios(URL_TEAMS);
            
            // Dispatcha la acción con los datos obtenidos
            return dispatch({
                type: GET_TEAMS,
                payload: data
            });
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}

// Acción para obtener detalles de un conductor por su ID
export const getDriverById = (id) => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para obtener detalles de un conductor por su ID
            const { data } = await axios(`${URL_DRIVERS}/${id}`);
            
            // Dispatcha la acción con los detalles obtenidos
            return dispatch({
                type: GET_DRIVER_ID, 
                payload: data
            })
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}

// Acción para cambiar la página de resultados (paginación)
export const changePage = (order) => {
    return async (dispatch) => {
        try {
            // Dispatcha la acción con el tipo de paginación y el orden recibidos como parámetros
            dispatch({
                type: PAGINATION,
                payload: order
            })
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}

// Acción para buscar conductores por nombre
export const searchDriver = (name) => {
    return async (dispatch) => {
        try {
            // Realiza una solicitud HTTP para buscar conductores por nombre
            const { data } = await axios(`${URL_DRIVERS}?name=${name}`);
            
            // Dispatcha la acción con los datos obtenidos
            return dispatch({
                type: SEARCH_DRIVER,
                payload: data
            });
        } catch (error) {
            // Si hay un error, muestra una alerta con el mensaje de error
            alert(error.response.data.error);
        }
    }
}

// Acción para filtrar conductores por equipo
export const filterTeam = (team) => {
    return async (dispatch) => {
        try {
            // Dispatcha la acción con el tipo de filtro y el equipo recibidos como parámetros
            return dispatch({
                type: FILTER_TEAM,
                payload: team
            });
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}

export const filterOrderName = (orderName) => {
    return async (dispatch) => {
      try {
        // Dispatcha la acción con el tipo de filtro y el orden recibidos como parámetros
        return dispatch({
          type: FILTER_ORDER_NAME,
          payload: orderName,
        });
      } catch (error) {
        // Maneja cualquier error imprimiéndolo en la consola
        console.log(error);
      }
    };
  };
  

// Acción para filtrar conductores por origen (API, creado localmente)
export const filterOrigin = (origin) => {
    return async (dispatch) => {
        try {
            // Dispatcha la acción con el tipo de filtro y el origen recibidos como parámetros
            return dispatch({
                type: FILTER_ORIGIN,
                payload: origin
            })
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}

// Acción para refrescar la lista de conductores
export const refresh = () => {
    return async (dispatch) => {
        try {
            // Dispatcha la acción de refresco
            return dispatch({
                type: REFRESH
            });
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}

// Acción para crear un nuevo conductor
export const createDriver = (form) => {
    return async () => {
        try {
            // Realiza una solicitud HTTP para crear un nuevo conductor
            await axios.post(URL_DRIVERS, form);
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}

// Acción para limpiar los detalles de un conductor
export const cleanDriverDetail = () => {
    return async (dispatch) => {
        try {
            // Despacha la acción para limpiar los detalles de un conductor
            return dispatch({
                type: CLEAN_DETAIL
            })
        } catch (error) {
            // Maneja cualquier error imprimiéndolo en la consola
            console.log(error);
        }
    }
}
