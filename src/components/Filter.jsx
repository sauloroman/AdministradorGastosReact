const Filter = ({
  filter,
  setFilter
}) => {
  return (
    <div className="filtros sombra contenedor">
      <form>
        <div className="campo">
          <label htmlFor="filter">Filtrar Gastos</label>
          <select 
            value = { filter }
            onChange = { e => setFilter( e.target.value ) }
            id="filter">
              <option value="">Todos los gastos</option>
              <option value="safe">Ahorro</option>
              <option value="food">Comida</option>
              <option value="home">Hogar</option>
              <option value="variety">Gastos Varios</option>
              <option value="entertainment">Entretenimiento</option>
              <option value="healthy">Salud</option>
              <option value="subscriptions">Subscripciones</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filter