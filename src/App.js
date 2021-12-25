import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './Containers/Forms/Login';
import Register from './Containers/Forms/Register';
import TripForm from './Containers/Forms/Trip';
import ProfileForm from './Containers/Forms/Profile';
import MyTrips from './Containers/MyTrips';
import Descriptions from './Containers/Destinations';
import Public from './Containers/Public';
import Header from './Components/Header';
import { Layout } from 'antd';
import './App.css';

export default function App() {
  const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)

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
      <Layout.Content>
        <Switch>
          <Route path='/' component={Public} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/popular-destinations" component={Descriptions} />
          <PrivateRoute path='/create/trip' component={TripForm} />
          <PrivateRoute path='/edit/trip/:id' component={TripForm} />
          <PrivateRoute path='/profile' component={ProfileForm} />
          <PrivateRoute path='/my-trips' component={MyTrips} />
        </Switch>
      </Layout.Content>
    </Layout>
  )
}
