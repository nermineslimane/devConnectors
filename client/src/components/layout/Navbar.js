import React from 'react'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      <ul>
        <Link to='/'>
          <a href='profiles.html'>Developers</a>
        </Link>
        <Link to='/register'>
          <a href='register.html'>Register</a>
        </Link>
        <Link to='/login'>
          <a href='login.html'>Login</a>
        </Link>
      </ul>
    </nav>
  )
}
export default Navbar
