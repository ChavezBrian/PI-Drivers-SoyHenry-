import { useEffect } from 'react'; // Importa el hook useEffect de React
import { useSelector, useDispatch } from 'react-redux'; // Importa las funciones useSelector y useDispatch de Redux
import { useParams } from 'react-router-dom'; // Importa el hook useParams de React Router para obtener parámetros de la URL
import { cleanDriverDetail, getDriverById } from '../../../redux/actions/actions'; // Importa acciones relacionadas con Redux
import "./details.css"; // Importa los estilos CSS

function Details() {
  const { id } = useParams(); // Obtiene el parámetro "id" de la URL utilizando el hook useParams de React Router
  const dispatch = useDispatch(); // Obtiene la función de despacho de Redux
  const driverDetail = useSelector(state => state.driverDetail); // Obtiene los detalles del conductor desde el estado global de Redux

  // Utiliza el hook useEffect para realizar acciones cuando el componente se monta y cuando cambia el valor de "id"
  useEffect(() => {
    dispatch(getDriverById(id)); // Llama a la acción getDriverById con el "id" obtenido de la URL para obtener los detalles del conductor

    // Define una función que se ejecutará cuando el componente se desmonte o cuando cambie el valor de "id"
    return () => dispatch(cleanDriverDetail()); // Llama a la acción cleanDriverDetail para limpiar los detalles del conductor al desmontar el componente o cuando cambie "id"
  }, [id]);

  return (
    <div className='detail-cont'>
      <div className='detail-driver'>
        <h2>ID</h2>
        <h3>{driverDetail?.id}</h3>
        <h2>Name</h2>
        <h3>{driverDetail?.name}</h3>
        <h2>Lastname</h2>
        <h3>{driverDetail?.lastname}</h3>
        <h2>Nationality</h2>
        <h3>{driverDetail?.nationality}</h3>
        <h2>Birthdate</h2>
        <h3>{driverDetail?.birthdate}</h3>
        <h2>Teams</h2>
        <h3>{driverDetail?.Teams}</h3>
        <h2>Description</h2>
        <h4>{driverDetail?.description || 'There is no description for this driver'}</h4>
      </div>
      <div>
        <img className='detail-img' src={driverDetail?.image} alt={driverDetail?.name} />
      </div>
    </div>
  )
}

export default Details