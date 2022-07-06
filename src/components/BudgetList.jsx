import Spending from "./Spending";

const BudgetList = ({
  spendings,
  setEdite,
  deleteSpending,
  filter, 
  filteredSpendings
}) => {
  return (
    <div className="listado-gastos contenedor">
      
      { filter ? 
        (
          <>
            <h2>{ filteredSpendings.length ? 'Gastos' : 'No hay gastos en esta categoría'}</h2>

            {
                filteredSpendings.map ( spending => (
                  <Spending 
                    spending = { spending }
                    key = { spending.id }
                    setEdite = { setEdite }
                    deleteSpending = { deleteSpending }
                  />
                ))
            }

          </>
        ) : 
        (
          <>
            <h2>{ spendings.length ? 'Gastos' : 'No hay gastos agregados'}</h2>

              {
                spendings.map ( spending => (
                  <Spending 
                    spending = { spending }
                    key = { spending.id }
                    setEdite = { setEdite }
                    deleteSpending = { deleteSpending }
                  />
                ))
              }

          </>
        ) 
      }

      

    </div>
  )
}

export default BudgetList