// Importa los elementos necesarios de react-router-dom
import { Routes, Route, useLocation } from "react-router-dom";

// Importa los componentes específicos de tu aplicación
import Nav from './components/nav/Nav';
import LandingPage from "./components/views/landingPage/LandingPage";
import Form from "./components/views/create/Form";
import Details from './components/views/detail/Details'
import Home from './components/views/Home/Home'

// Define el componente principal de la aplicación (App)
function App() {
  // Utiliza useLocation para obtener la ubicación actual de la ruta
  const location = useLocation();

  // Retorna el contenido de la aplicación
  return (
    <>
      {/* Renderiza el componente de navegación solo si la ruta no es "/" */}
      {location.pathname !== "/" ? <Nav /> : null}

      {/* Define las rutas de la aplicación */}
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/form' element={<Form />}/>
        <Route path='/detail/:id' element={<Details />}/>
      </Routes>
    </>
  );
}

// Exporta el componente principal de la aplicación (App)
export default App;

