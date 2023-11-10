import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDriver, getTeams } from '../../../redux/actions/actions'; // Importa las acciones relacionadas con Redux
import validation from "../../../validation"; // Importa el módulo de validación
import "./form.css"; // Importa estilos CSS

function Form() {
  const dispatch = useDispatch(); // Obtiene la función de despacho de Redux
  const teams = useSelector(state => state.teams); // Obtiene la lista de equipos desde el estado global de Redux
  const drivers = useSelector(state => state.drivers); // Obtiene la lista de conductores desde el estado global de Redux

  useEffect(() => {
    dispatch(getTeams()); // Carga la lista de equipos al montar el componente
  },[]);

  // Define el estado local para almacenar los datos del formulario y otros datos
  const [form, setForm] = useState({
    name:"",
    lastname:"",
    nationality:"",
    birthdate:"",
    Teams:[],
    image:"",
    description:"",
  });

  const [cont, setCont] = useState(1); // Contador para la creación de campos de selección de equipos
  const [team, setTeam] = useState([]); // Almacena las selecciones de equipos
  const [inputTeam, setInputTeam] = useState([]); // Almacena los campos de selección de equipos
  const [errors, setErrors] = useState({}); // Almacena errores de validación

  // Maneja los cambios en los campos del formulario y realiza validación
  const handleInput = (event) => {
    if (event.target.name === "teams") {
      if (event.target.value !== "------") {
        setTeam([...team, event.target.value]); // Agrega el equipo seleccionado a la lista de equipos
        setForm((prev) => ({
          ...prev,
          Teams: [...prev.Teams, event.target.value] // Actualiza los equipos en el estado del formulario
        }));
      }
    }
    if (event.target.name !== "teams") {
      setForm({
        ...form,
        [event.target.name]: event.target.value, // Actualiza los otros campos del formulario
      });
    }

    // Realiza la validación de los datos del formulario y actualiza los errores
    setErrors(validation({
      ...form,
      [event.target.name]: event.target.value
    }));
  }

  // Agrega un nuevo campo de selección de equipos
  const addTeam = (event) => {
    event.preventDefault();
    setInputTeam([...inputTeam,
      <div className='form-label' key={cont}>
        <label htmlFor="teams">Teams:</label>
        <select onChange={handleInput} name="teams" id="teams">
          <option value="------">------</option>
          {teams.map((team, index) => <option key={index} value={team}>{team}</option>)}
        </select>
      </div>
    ]);
    setCont(cont + 1); // Incrementa el contador
  }

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("teams").value = "------"; // Restablece el campo de selección de equipos

    // Comprueba si ya existe un conductor con el mismo nombre y apellido
    const driversRepeat = drivers.find(driver => driver.name.toLowerCase() === form.name.toLowerCase() && driver.lastname.toLowerCase() === form.lastname.toLowerCase());

    // Verifica que todos los campos del formulario estén completos
    for (const key in form) {
      if (form[key] === "") return alert("Missing data to complete");
    }

    // Comprueba si hay errores de validación
    // Si se activa esta validación, se deben descomentar las líneas correspondientes en el código
    // if (Object.keys(errors).length) return alert("Missing data to complete");

    // Comprueba si ya existe un conductor con el mismo nombre y apellido
    if (driversRepeat) return alert("The driver is already registered");

    // Llama a la acción createDriver para crear un nuevo conductor en el estado global de Redux
    dispatch(createDriver(form));
    alert("Driver is created"); // Muestra una alerta de éxito
    setInputTeam([]); // Limpia los campos de selección de equipos
    setForm({
      name:"",
      lastname:"",
      nationality:"",
      birthdate:"",
      Teams:[],
      image:"",
      description:"",
    }); // Limpia el formulario
  }

  return (
    <div className='form-cont'>
    <h2>Complete the following form</h2>
    <form onSubmit={handleSubmit}>

      <fieldset>
        <h3>Driver Information</h3>

        <label className='form-label'>Name:
        <input onChange={handleInput} value={form.name} type="text" name="name" placeholder='Add name...'/>
        <div className='error-cont'>{errors.name}</div>
        </label>

        <label className='form-label' >Lastname:
        <input onChange={handleInput} value={form.lastname} type="text" name="lastname" placeholder='Add lastname...'/>
        <div className='error-cont'>{errors.lastname}</div>
        </label>

        <label className='form-label' >Nationality:
        <input onChange={handleInput} value={form.nationality} type="text" name="nationality" placeholder='Add a nationality...'/>
        <div className='error-cont'>{errors.nationality}</div>
        </label>

        <label className='form-label'>Birthdate:
        <input onChange={handleInput} value={form.birthdate} type="date" name="birthdate" id="birthdate" placeholder='Write...'/> 
        <div className='error-cont'>{errors.birthdate}</div>
        </label>
      </fieldset>

      <fieldset>
        <h3>Additional Information</h3>

        <div className='form-label'>
          <label htmlFor="teams">Teams:</label>
          <select onChange={handleInput} name="teams" id="teams">
            <option value="------">Select a team</option>
            {teams?.map((team,index) => <option key={index} value={team}>{team}</option>)}
          </select>
        </div>
        {inputTeam.length ? inputTeam.map((e)=>e) : null}
          <button onClick={addTeam} className='form-button'>+</button>

        <label className='form-label'>Image:
          <input onChange={handleInput} value={form.image} name='image' type="text" placeholder='Insert a link...'/>
          <div className='error-cont'>{errors.image}</div>
        </label>

        <label className='form-label'>Description: <br />
          <textarea onChange={handleInput} value={form.description} name="description" cols="30" rows="10" placeholder='Add a description...'></textarea>
          <div className='error-cont'>{errors.description}</div>
        </label>
      </fieldset>

      <button type="submit" className='form-submit'>Register</button>
    </form>
    </div>
  )
}

export default Form