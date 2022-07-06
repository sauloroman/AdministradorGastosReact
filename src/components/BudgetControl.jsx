import { useState, useEffect } from "react";

// DEPENDENCIES
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

const BudgetControl = ({
  budget,
  setBudget,
  spendings,
  setSpendings,
  setIsValidBudget
}) => {

  // ######################
  // STATES
  // ######################
  const [ percentage, setPercentage ] = useState(0);
  const [ available, setAvailable ] = useState( 0 );
  const [ spent, setSpent ] = useState( 0 );


  // ######################
  // EFFECTS
  // ######################
  useEffect( () => {

    const totalSpent = spendings.reduce( (acc, spending) => acc + spending.amount, 0);
    const totalAvailable = budget - totalSpent;
    const newPercentage = ( ( ( budget - totalAvailable ) / budget ) * 100 ).toFixed(2);

    setAvailable( totalAvailable );
    setSpent( totalSpent );
    
    setTimeout( () => {
      setPercentage( newPercentage );
    }, 1000 )

  }, [ spendings ])

  // ######################
  // FUNCTIONS
  // ######################

  const formatAmount = amount => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  const handleResetApp = () => {
    const answer = confirm('¿Desea reiniciar el presupuesto y los gastos agregados?');

    if ( answer ) {
      setSpendings( [] );
      setBudget( 0 );
      setIsValidBudget( false );
    }

  }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">

      <div>
        <CircularProgressbar 
          value = { percentage }
          styles = { buildStyles({
            pathColor: percentage > 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#f5f5f5',
            textColor: percentage > 100 ? '#DC2626' : '#3B82F6'
          })}
          text = { `${percentage}% gastado` }
        />
      </div>

      <div className="contenido-presupuesto">

        <button
          className = "reset-app"
          type = "reset"
          onClick = { handleResetApp }
        >
          Reiniciar App          
        </button>

        <p>
          <span>Presupesto: </span> { formatAmount( budget )}
        </p>
        <p>
          <span>Disponible: </span> { formatAmount( available )}
        </p>
        <p>
          <span>Gastado: </span> { formatAmount( spent )}
        </p>

      </div>

    </div>
  )
}

export default BudgetControl