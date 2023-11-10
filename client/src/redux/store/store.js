// Importa funciones y middleware de Redux
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";

// Importa el reductor (reducer) que define cómo cambia el estado en respuesta a acciones
import reducer from "../reducer/reducer";

// Configura la extensión para las herramientas de desarrollo de Redux o utiliza compose si no está disponible
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Crea la tienda de Redux con el reductor y el middleware
const store = createStore(
  reducer, // El reductor que maneja los cambios en el estado
  composeEnhancer(applyMiddleware(thunkMiddleware)) // Aplica el middleware de thunk para manejar acciones asíncronas
);

// Exporta la tienda para que pueda ser utilizada en otros archivos
export default store;
