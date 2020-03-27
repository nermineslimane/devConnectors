import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
export const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/dashboard'>
          <a href='login.html'>
            <i className='fas fa-user'></i>
            <span className='hide-sm'>Dashboard</span>
          </a>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  )
  const guestlinks = (
    <ul>
      <Link to='/'>
        <a href='#!'>Developers</a>
      </Link>
      <Link to='/register'>
        <a href='register.html'>Register</a>
      </Link>
      <Link to='/login'>
        <a href='login.html'>Login</a>
      </Link>
    </ul>
  )
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>

      {//if not loading do this '' then if authenticated show auth links else show guest links
      !loading && (
        <Fragment>{isAuthenticated ? authLinks : guestlinks}</Fragment>
      )}
    </nav>
  )
}
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar)
