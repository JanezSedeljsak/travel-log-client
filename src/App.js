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
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { ToastProvider } from 'react-toast-notifications';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const isAuth = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)
  const isAdmin = useSelector(state => state.user.isAdmin === true);
  const location = useLocation()

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuth === true
        ? <Component {...props} />
        : <Redirect to='/travel-log-client/login' />
    )} />
  )

  const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      (isAuth && isAdmin)
        ? <Component {...props} />
        : <Redirect to='/travel-log-client/login' />
    )} />
  )

  return (
    <ToastProvider>
      <Layout>
        <Header isAuth={isAuth} isAdmin={isAdmin} />
        <Switch>
          <Route path='/travel-log-client/' component={Public} exact />
          {['/travel-log-client/login', '/travel-log-client/register'].includes(location.pathname) && <div id="container-with-background">
            <Route path="/travel-log-client/login" component={Login} />
            <Route path="/travel-log-client/register" component={Register} />
          </div>}
          <Layout.Content>
            <Route path='/travel-log-client/trips' component={Trips} />
            <Route path="/travel-log-client/members" component={Members} />
            <PrivateRoute path='/travel-log-client/create/trip' component={TripForm} />
            <PrivateRoute path='/travel-log-client/edit/trip/:id' component={TripForm} />
            <PrivateRoute path='/travel-log-client/profile' component={ProfileForm} />
            <AdminRoute path="/travel-log-client/dashboard" component={Dashboard} />
          </Layout.Content>
        </Switch>
      </Layout>
    </ToastProvider>
  )
}
