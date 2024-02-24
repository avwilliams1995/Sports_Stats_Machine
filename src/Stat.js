const Stat = ({ winner, winnerType, name, statType, stat, spread, propType}) => {
  if (statType === 'total_rebounds'){
    statType = 'rebounds'
  }
  if (statType!== ''){
    statType =  `${statType[0].toUpperCase()}${statType.substring(1)}`
  }
  return (
    <div className="stats" id={winnerType}> 
          <h1>
            <u style={{color:'black'}}>Whipped Up Results</u>
          </h1>
          <h3>{winner}</h3>
          <p id="bet-listing">
            {name} {statType}: {propType} {spread}
          </p>
          <p id="stat">{stat}</p>
        </div>
  )
}

export default Stat