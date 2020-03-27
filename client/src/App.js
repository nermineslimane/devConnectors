import React, { Fragment, useEffect } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
//REDUX STUFF
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'
import CreateProfile from './components/profile-form/CreateProfile'
import EditProfile from './components/profile-form/EditProfile'
import AddExperience from './components/profile-form/AddExperience'
import AddEducation from './components/profile-form/AddEducation'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path='/' component={Landing}></Route>
          <section className='container'>
            <Alert></Alert>
            <Switch>
              <Route exact path='/register' component={Register}></Route>
              <Route exact path='/login' component={Login}></Route>
              <PrivateRoute
                exact
                path='/Dashboard'
                component={Dashboard}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/create-profile'
                component={CreateProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/add-experience'
                component={AddExperience}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path='/add-education'
                component={AddEducation}
              ></PrivateRoute>
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
