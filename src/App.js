import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import Login from './containers/Forms/Login';
import Register from './containers/Forms/Register';
import TripForm from './containers/Forms/Trip';
import ProfileForm from './containers/Forms/Profile';
import Trips from './containers/Trips';
import Members from './containers/Members';
import Public from './containers/Public';
import Header from './components/Header';
import Dashboard from './containers/Dashboard';
import { Layout } from 'antd';
import './App.css';

export default function App() {
  const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)
  const isAdmin = useSelector(state => state.user.isAdmin === true);
  const location = useLocation()

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuth === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      (isAuth && isAdmin)
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )

  return (
    <Layout>
      <Header isAuth={isAuth} isAdmin={isAdmin} />
      <Switch>
        <Route path='/' component={Public} exact />
        {['/login', '/register'].includes(location.pathname) && <div id="container-with-background">
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>}
        <Layout.Content>
          <Route path='/trips' component={Trips} />
          <Route path="/members" component={Members} />
          <PrivateRoute path='/create/trip' component={TripForm} />
          <PrivateRoute path='/edit/trip/:id' component={TripForm} />
          <PrivateRoute path='/profile' component={ProfileForm} />
          <AdminRoute path="/dashboard" component={Dashboard} />
        </Layout.Content>
      </Switch>
    </Layout>
  )
}
