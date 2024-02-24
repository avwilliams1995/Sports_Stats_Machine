

const PlayerBox = ({props}) => {
 return (
  <div>
      <div className="search-form">
        <input className='search-bar' type='text' placeholder='Player Name' value={props.search} onChange={(e) => props.updateText(e, props.otherKey)}/>
        <div>
        <select name="type" id="stat-types" onChange={(e) => props.updateStatType(e, props.otherKey)}> 
          <option value="">Select Bet </option> 
          <option value="points">Points</option> 
          <option value="assists">Assists</option> 
          <option value="total_rebounds">Rebounds</option> 
          <option value="blocks">Blocks</option> 
          <option value="steals">Steals</option> 
        </select>
        </div>
        <div>
        <select name="type" id="stat-types" onChange={(e) => props.updatePropType(e, props.otherKey)}> 
          <option value="">Over/Under </option> 
          <option value="Over">Over</option> 
          <option value="Under">Under</option> 
        </select>
        </div>
        <input className='search-bar2' placeholder='Total' type='text' value={props.spread} onChange={(e) => props.updateSpread(e, props.otherKey)}/>
        <div>
        <select name="type" id="date-types" onChange={(e) => props.updateDateType(e, props.otherKey)}> 
          <option value="">Select Date </option> 
          <option value="live">Live</option> 
          <option value={props.dates[0]}>Yesterday</option> 
          <option value={props.dates[1]}>01-16-24</option> 
          <option value={props.dates[2]}>01-15-24</option> 
        </select>
        </div>
      </div>
    
  </div>
 )
}



export default PlayerBox 