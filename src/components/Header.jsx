import Budget from "./Budget";
import BudgetControl from "./BudgetControl";

const Header = ({
  budget, 
  setBudget,
  isValidBudget,
  setIsValidBudget,
  spendings,
  setSpendings
}) => {
  return (
    <header className="header">
      
      <h1> Planificador de gastos </h1>

      { isValidBudget ? 
        (
          <BudgetControl 
            budget = { budget }
            setBudget = { setBudget }
            spendings = { spendings }
            setSpendings = { setSpendings }
            setIsValidBudget = { setIsValidBudget }
          />
        ) : 
        (
          <Budget 
            budget = { budget }
            setBudget = { setBudget }
            setIsValidBudget = { setIsValidBudget }
          />
        )
      }

    </header>
  )
}

export default Header;
