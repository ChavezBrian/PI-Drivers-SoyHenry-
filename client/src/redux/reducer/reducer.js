// Importa los tipos de acciones (action types) desde el archivo de acciones
import {
    CLEAN_DETAIL,
    FILTER_ORIGIN,
    FILTER_TEAM,
    GET_DRIVERS,
    GET_DRIVER_ID,
    GET_TEAMS,
    PAGINATION,
    REFRESH,
    SEARCH_DRIVER,
    FILTER_ORDER_NAME,
} from "../actions/actions-types";

// Define el estado inicial de la aplicación
const initialState = {
    drivers: [],
    driversBackUp: [],
    driverDetail: {},
    teams: [],
    currentPage: 0,
    itemsPerPage: 9,
};

// Define el reductor que maneja las acciones y actualiza el estado en consecuencia
const reducer = (state = initialState, action) => {
    const { driversBackUp, itemsPerPage } = state;

    switch (action.type) {
        // Acción para obtener la lista de conductores
        case GET_DRIVERS:
            return {
              ...state, // Copia el estado actual
              drivers: action.payload.slice(0, itemsPerPage), // Actualiza el campo "drivers" con una lista paginada
              driversBackUp: action.payload, // Almacena una copia completa de todos los conductores
            };
          

        // Acción para obtener la lista de equipos
        case GET_TEAMS:
            return {
              ...state, // Copia el estado actual
              teams: action.payload, // Actualiza el campo "teams" con la información de los equipos
            };
          

        // Acción para obtener detalles de un conductor por ID
        case GET_DRIVER_ID:
            return {
              ...state, // Copia el estado actual
              driverDetail: action.payload, // Actualiza el campo "driverDetail" con los detalles del conductor identificado por su ID
            };
          

        // Acción para gestionar la paginación
        case PAGINATION:
            const { payload } = action; // Desestructura el valor de payload de la acción
            const next_page = state.currentPage + 1; // Calcula la página siguiente
            const prev_page = state.currentPage - 1; // Calcula la página anterior
          
            // Calcula el índice del primer elemento a mostrar en la página siguiente o anterior
            const firstIndex =
              payload === "next" ? next_page * itemsPerPage : prev_page * itemsPerPage;
          
            // Verifica si no hay más páginas para avanzar o retroceder
            if (
                (payload === "next" && firstIndex >= driversBackUp.length) ||
                (payload === "prev" && prev_page < 0)
            ) {
              return state; // Devuelve el estado actual sin cambios
            }
          
            // Actualiza el estado con los conductores paginados y la página actual
            return {
                ...state, // Copia el estado actual
                drivers: driversBackUp.slice(firstIndex, firstIndex + itemsPerPage), // Actualiza la lista de conductores con la página actual
                currentPage: payload === "next" ? next_page : prev_page, // Actualiza la página actual
            };
          

        // Acción para realizar una búsqueda de conductores
        case SEARCH_DRIVER:
            return {
              ...state, // Copia el estado actual
              drivers: action.payload.slice(0, itemsPerPage), // Actualiza la lista de conductores con los resultados de la búsqueda
            };
          
        //Accion para filtrar conductores por equipo
        case FILTER_TEAM:
            const filteredByTeam =
                action.payload === "------"
                    ? state.driversBackUp
                    : state.driversBackUp.filter((driver) =>
                        driver.Teams?.includes(action.payload)
                    );

            return {
                ...state,
                drivers: filteredByTeam.slice(0, itemsPerPage),
            };

        // Accion para filtrar conductores por nombre
        case FILTER_ORDER_NAME:
            const orderNameType = action.payload;
            const sortedNameDrivers = orderNameType === "asc"
                ? [...state.driversBackUp].sort((a, b) => {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    return nameA.localeCompare(nameB);
                })
                : orderNameType === "desc"
                    ? [...state.driversBackUp].sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        return nameB.localeCompare(nameA);
                    })
                    : [...state.driversBackUp];

            return {
                ...state,
                drivers: sortedNameDrivers,
            };

        // Acción para filtrar conductores por origen (API o creado localmente)
        case FILTER_ORIGIN:
            const originType = action.payload;
            const filteredOrigin =
                originType === "all-drivers"
                    ? driversBackUp
                    : originType === "api"
                        ? driversBackUp.filter((driver) => !isNaN(driver.id))
                        : originType === "created"
                            ? driversBackUp.filter((driver) => isNaN(driver.id))
                            : driversBackUp;

            return {
                ...state,
                drivers: filteredOrigin.slice(0, itemsPerPage),
            };

        // Acción para refrescar la lista de conductores
        case REFRESH:
            return {
                ...state,
                drivers: driversBackUp.slice(0, itemsPerPage),
                currentPage: 0,
            };

        // Acción para limpiar los detalles de un conductor
        case CLEAN_DETAIL:
            return {
                ...state,
                driverDetail: {},
            };

        // Acción por defecto (sin cambios en el estado)
        default:
            return state;


    }

};

// Exporta el reductor para ser utilizado en la configuración de la tienda (store)
export default reducer;

