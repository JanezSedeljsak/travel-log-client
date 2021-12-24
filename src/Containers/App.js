import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import MyTrips from './MyTrips';
import Public from './Public';

export default function App() {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isLoggedIn === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  return (
    <div>
      <Switch>
        <Route path='/' component={Public} exact  />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoute path='/my-trips' component={MyTrips} />
      </Switch>
    </div>
  )
}

export const x = 5;
