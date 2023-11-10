// Importa las bibliotecas necesarias de React y ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Importa el componente principal de la aplicación (App) y los estilos
import App from './App.jsx';
import './index.css';

// Importa BrowserRouter de react-router-dom para el enrutamiento en el lado del cliente
import { BrowserRouter } from "react-router-dom";

// Importa Provider de react-redux para proporcionar el estado de Redux a la aplicación
import { Provider } from "react-redux";

// Importa la tienda (store) de Redux
import store from "./redux/store/store.js";

// Utiliza ReactDOM.createRoot para renderizar la aplicación en el elemento con el id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // Utiliza Provider para proporcionar la tienda de Redux a la aplicación
  <Provider store={store}>
    {/* Utiliza BrowserRouter para habilitar el enrutamiento en el lado del cliente */}
    <BrowserRouter>
      {/* Renderiza el componente principal de la aplicación (App) */}
      <App />
    </BrowserRouter>
  </Provider>
);

