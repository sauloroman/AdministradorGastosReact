// HOOKS
import { useDebugValue, useEffect, useState } from "react";

// COMPONENTS
import Message from "./Message";

// IMAGES
import btnCloseModal from '../img/cerrar.svg';

const Modal = ({
  setModal,
  animateModal,
  setAnimateModal,
  safeSpending,
  edite,
  setEdite
}) => { 

  // ##########################
  // STATES
  // ##########################

  // Used to show an alert if any input is empty
  const [ message, setMessage ] = useState('');

  // Input field states
  const [ name, setName ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ category, setCategory ] = useState('');

  // Editing spending
  const [ id, setId ] = useState('');
  const [ date, setDate ] = useState('');

  // ##########################
  // EFFECTS
  // ##########################

  useEffect( () => {
    if( Object.keys( edite ).length ) {
      setName( edite.name );
      setAmount( edite.amount );
      setCategory( edite.category );

      setId( edite.id );
      setDate( edite.date );
    }
  }, [] )

  // ##########################
  // FUNCTIONS
  // ##########################

  // Validate the form
  const handleSubmitSpending = e => {
    
    e.preventDefault();

    if ( [ name, amount, category].includes('') ) {
      setMessage('Todos los campos son obligatorios');

      setTimeout( () => {
        setMessage('');
      }, 3000 )

      return;
    }

    safeSpending( { name, amount, category, id, date } );
    handleHidden();

  }

  // Close modal
  const handleHidden = () => {
    
    setAnimateModal( false );

    setEdite({});

    setTimeout( () => {
      setModal( false );
    }, 500 )

  }

  return (
    <div className="modal">

      <div className="cerrar-modal">
        <img 
          onClick = { handleHidden }
          src = { btnCloseModal } 
          alt = "Cruz blanca" />
      </div>
      
      <form
        onSubmit = { handleSubmitSpending }
        className={`formulario ${ animateModal ? 'animar': 'cerrar'}`}
      >

        <legend>{ edite.id ? "Editar gasto": "Nuevo gasto"}</legend>

        { message && <Message type = {'error'} >{ message }</Message> }

        <div className="campo">
          <label htmlFor="name">Nombre del Gasto</label>
          <input 
            value = { name }
            onChange = { e => setName( e.target.value ) }
            placeholder="Ingresa el nombre del gasto"
            type="text" 
            id="name" />
        </div>

        <div className="campo">
          <label htmlFor="amount">Cantidad</label>
          <input 
            value = { amount }
            onChange = { e => setAmount( Number(e.target.value) ) }
            placeholder="Ingresa el costo del gasto. Ej. 300"
            type="number" 
            id="amount" />
        </div>

        <div className="campo">
          <label htmlFor="categories">Categorías</label>
          <select 
            value = { category }
            onChange = { e => setCategory( e.target.value ) }
            id="categories">

            <option> Seleccione la categoría </option>
            <option value="safe">Ahorro</option>
            <option value="food">Comida</option>
            <option value="home">Hogar</option>
            <option value="variety">Gastos Varios</option>
            <option value="entertainment">Entretenimiento</option>
            <option value="healthy">Salud</option>
            <option value="subscriptions">Subscripciones</option>

          </select>
        </div>  

        <input 
          type="submit" 
          value = { edite.id ? "Guardar cambios": "Agregar gasto"}
          />

      </form>

    </div>
  )
}

export default Modal
