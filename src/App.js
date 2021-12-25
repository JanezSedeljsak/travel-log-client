import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './Containers/Login';
import Register from './Containers/Register';
import MyTrips from './Containers/MyTrips';
import Public from './Containers/Public';
import Header from './Components/Header';
import { Layout } from 'antd';
import './App.css';

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
    <Layout>
      <Header />
      <Layout.Content>
        <Switch>
          <Route path='/' component={Public} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path='/my-trips' component={MyTrips} />
        </Switch>
      </Layout.Content>
    </Layout>
  )
}

export const x = 5;
