import { useState } from 'react';

import Message from './Message';

const Budget = ({
  budget, 
  setBudget,
  setIsValidBudget
}) => {

  // Used to show an alert if any input is empty
  const [ message, setMessage ] = useState('');

  const handleSubmitBudget = e => {

    e.preventDefault();

    if ( !budget || budget <= 0 ) {
      setMessage('No es un presupuesto válido');
      return;
    }

    setMessage(''); 
    setIsValidBudget( true );
    
  }

  return (
    <div className="contenedor-presupuesto sombra contenedor">

      <form 
        onSubmit={ handleSubmitBudget }
        className="formulario">

        <div className="campo">
          <label htmlFor="budget">Definir presupuesto</label>
          <input 
            value = { budget }
            onChange = { e => setBudget( Number(e.target.value) )}
            type="number" 
            id="budget" 
            className="nuevo-presupuesto"
            placeholder="Añade tu presupuesto"
          />
        </div>

        <input type="submit" value="Añadir"/>

        { message && <Message type = {'error'} >{ message }</Message>}

      </form>

    </div>
  )
}

export default Budget;