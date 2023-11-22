import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header >
        <ul className='header'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/addbook">Add Book</Link></li>
            <li><Link to="#">All Books</Link></li>
            <li><Link to="#">About</Link></li>
        </ul>        
    </header>
  )
}

export default Header