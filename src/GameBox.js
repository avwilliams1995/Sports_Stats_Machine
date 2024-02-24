const GameBox = ({props}) => {
  return (
    <div>
      {/* <form onSubmit={(e) => props.getSearch(e, props.otherKey)}> */}
        <div className="search-form">
          <input className='search-bar' type='text' placeholder='Team Name' value={props.search} onChange={(e) => props.updateText(e, props.otherKey)}/>
          <div>
          <select name="type" id="stat-types" onChange={(e) => props.updateStatType(e, props.otherKey)}> 
            <option value="">Select Bet </option> 
            <option value="Moneyline">Moneyline</option> 
            <option value="Spread">Spread</option> 
            <option value="Over">Over</option> 
            <option value="Under">Under</option> 
          </select>
          </div>
          <input className='search-bar2' type='text' placeholder='Spread Total' value={props.spread} onChange={(e) => props.updateSpread(e, props.otherKey)}/>
          <div>
          <select name="type" id="date-types" onChange={(e) => props.updateDateType(e, props.otherKey)}> 
            <option value="">Select Date </option> 
            <option value="live">Live</option> 
            <option value={props.dates[0]}>Yesterday</option> 
          <option value={props.dates[1]}>01-16-24</option> 
          <option value={props.dates[2]}>01-15-24</option> 
          </select>
          </div>
          {/* <button className='search-button' type='submit'>
            Search
          </button> */}
        </div>
      {/* </form> */}
    </div>
   )
};

export default GameBox;
