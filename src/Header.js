import React from 'react'

const Header = ({loading}) => {
  let show;
  if (loading) {
    show = <h1 className='loading'>Loading...</h1>
  } 
  return (
  <header className="header">
      <h1><u><i>Sports Stat Machine</i></u></h1>
      <h1>{show}</h1>
    </header>
  )
}

export default Header