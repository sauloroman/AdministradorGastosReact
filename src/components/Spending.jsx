// SWIPEABLE LIST
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list';

import 'react-swipeable-list/dist/styles.css';

// FUNCTIONS
import { formatDate } from '../helpers';

// IMAGES
import iconSafe from '../img/icon-safe.svg';
import iconHome from '../img/icon-home.svg';
import iconFood from '../img/icon-food.svg';
import iconVariety from '../img/icon-variety.svg';
import iconEntertaiment from '../img/icon-entertainment.svg';
import iconHealthy from '../img/icon-healthy.svg';
import iconSubscriptions from '../img/icon-subscriptions.svg';

const Spending = ({
  spending,
  setEdite,
  deleteSpending 
}) => {

  const {name, amount, category, id, date} = spending;

  const images = {
    safe: iconSafe,
    food: iconFood,
    home: iconHome,
    variety: iconVariety,
    entertainment: iconEntertaiment,
    healthy: iconHealthy,
    subscriptions: iconSubscriptions,
  } 

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction 
        onClick = { () => setEdite( spending ) }>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick = { () => deleteSpending( id ) }
        destructive = { true }
        >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
        <SwipeableListItem
          leadingActions = { leadingActions() }
          trailingActions = { trailingActions() }
        >
          <div className="gasto sombra">
            <div className="contenido-gasto">
              <img 
                src = { images[ category ] } 
                alt = "Imagen de la categoría correspondiente" />

              <div className="descripcion-gasto">
                <p className="categoria"> { category } </p>
                <p className='nombre-gasto'> { name } </p>
                <p className='fecha-gasto'>Agregado el {' '} <span>{ formatDate( date )}</span></p>
              </div>

              <p className='cantidad-gasto'>${ amount }</p>

            </div>
          </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Spending