import React, { fragment, Fragment } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
//REDUX STUFF
import { Provider } from 'react-redux'
import store from './store'
const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar></Navbar>
        <Route exact path='/' component={Landing}></Route>
        <section className='container'>
          <Switch>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)

export default App
