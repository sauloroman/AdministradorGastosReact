// HOOKS
import { useState, useEffect } from 'react';

// COMPONENTS
import Header from './components/Header';
import Filter from './components/Filter';
import BudgetList from './components/BudgetList';
import Modal from './components/Modal';

// FUNCTIONS
import { generateId } from './helpers';

// IMAGES
import btnOpenModal from './img/nuevo-gasto.svg';


const App = () => {

  // ###############################
  // STATES
  // ###############################

  // Budget states
  const [budget, setBudget] = useState( Number ( JSON.parse( localStorage.getItem('budget')) ) || 0 );
  const [ isValidBudget, setIsValidBudget ] = useState ( false );

  // Modal states
  const [ modal, setModal ] = useState( false );
  const [ animateModal, setAnimateModal ] = useState( false );

  // Spending states
  const [ spendings, setSpendings ] = useState( JSON.parse( localStorage.getItem('spendings')) || [] );

  // Edite states
  const [ edite, setEdite ] = useState( {} );

  // Filter states
  const [ filter, setFilter ] = useState('');
  const [ filteredSpendings, setFilteredSpendings ] = useState([]);
 
  // ###############################
  // EFFECTS
  // ###############################

  useEffect( () => {

    if ( Object.keys( edite ).length ) {
      setModal( true );

      setTimeout ( () => {
        setAnimateModal( true );
      }, 500 )
    }

  }, [ edite ] )

  // Set at local Storage the budget
  useEffect( () => {
    localStorage.setItem('budget', budget );
  }, [ budget ] )

  useEffect( () => {
    localStorage.setItem('spendings', JSON.stringify( spendings ) );
  }, [ spendings ] );

  // Set the budget if it already exists
  useEffect( () => {
    const budgetLS = Number ( JSON.parse( localStorage.getItem('budget')) );

    if ( budgetLS ) setIsValidBudget ( true );
  
  }, [] )

  // To filter the spendigs
  useEffect( () => {
    if ( filter ) {
      const filtered = spendings.filter( spending => spending.category === filter );
      setFilteredSpendings( filtered ); 
    }
  }, [ filter ] )

  // ###############################
  // FUNCTIONS
  // ###############################
  const handleSpending = () => {
    
    setModal( true );

    setTimeout( () => {
      setAnimateModal( true );
    }, 500 );

  }

  const safeSpending = spending => {

    if ( spending.id ) {
      // Editing spending
      const updatedSpendigs = spendings.map( spendingState => spendingState.id === spending.id ? spending : spendingState );
      console.log( updatedSpendigs );
      setSpendings( updatedSpendigs );
      setEdite({});

    } else {  
      // Add a new spending
      spending.id = generateId(); 
      spending.date = Date.now();
      setSpendings([ ...spendings, spending ]);
    }

  }

  const deleteSpending = id => {
    const updatedSpendigs = spendings.filter( spending => spending.id !== id );
    setSpendings( updatedSpendigs );
  }

  return (
    <div className={ modal ? "fijar": ""}>
      <Header 
        budget = { budget }
        setBudget = { setBudget }
        isValidBudget = { isValidBudget }
        setIsValidBudget = { setIsValidBudget }
        spendings = { spendings }
        setSpendings = { setSpendings }
      />

      { isValidBudget && (
        <>
          <main>
            <Filter 
              filter = { filter }
              setFilter = { setFilter }
            />
            <BudgetList 
              spendings = { spendings }
              setEdite = { setEdite }
              deleteSpending = { deleteSpending }
              filter = { filter }
              filteredSpendings = { filteredSpendings }
            />
          </main>
          <div className="nuevo-gasto">
            <img 
              onClick = { handleSpending }
              src = { btnOpenModal } 
              alt = "Circulo Azul Cruz Blanca" />
          </div>
        </>
      )}

      { modal && (
        <Modal 
          setModal = { setModal }
          animateModal = { animateModal } 
          setAnimateModal = { setAnimateModal }
          safeSpending = { safeSpending }
          edite = { edite }
          setEdite = { setEdite }
        />
      )}

    </div>
  )
}

export default App;