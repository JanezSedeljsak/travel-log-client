import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import Login from './Containers/Forms/Login';
import Register from './Containers/Forms/Register';
import TripForm from './Containers/Forms/Trip';
import ProfileForm from './Containers/Forms/Profile';
import Trips from './Containers/Trips';
import Members from './Containers/Members';
import Public from './Containers/Public';
import Header from './Components/Header';
import { Layout } from 'antd';
import './App.css';

export default function App() {
  const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)
  const location = useLocation()

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuth === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  return (
    <Layout>
      <Header isAuth={isAuth} />
      <Switch>
        <Route path='/' component={Public} exact />
        {['/login', '/register'].includes(location.pathname) && <div id="container-with-background">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>}
        <Layout.Content>
          <Route path='/trips' component={Trips} />
          <PrivateRoute path='/create/trip' component={TripForm} />
          <PrivateRoute path='/edit/trip/:id' component={TripForm} />
          <PrivateRoute path='/profile' component={ProfileForm} />
          <PrivateRoute path="/members" component={Members} />
        </Layout.Content>
      </Switch>
    </Layout>
  )
}
