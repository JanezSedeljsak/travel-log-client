import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link as RouterLink } from 'react-router-dom'
import { actions } from '../../redux/user'

export default () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null);
    const registerError = useSelector(state => state.user.registerError);
    const isRegisterError = registerError ? true : false;
    const dispatch = useDispatch();

    const [values, setValues] = React.useState({
        email: '',
        password: ''
    });


    const handleOnChange = (value, name) => {
        setValues({ ...values, [name]: value });
    }

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch]);

    if (isLoggedIn) return <Redirect to="/Home" />

    return (
        <div>register form</div>
    );
}