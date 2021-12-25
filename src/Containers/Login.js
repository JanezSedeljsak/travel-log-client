import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Link as RouterLink } from 'react-router-dom'
import { actions } from '../redux/user'

export default () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn && state.user.jwt !== null)
    const loginError = useSelector(state => state.user.loginError)
    const isLoginError = loginError ? true : false

    const dispatch = useDispatch()

    const [values, setValues] = React.useState({
        username: '',
        password: ''
    })

    const handleOnChange = (value, name) => {
        setValues({ ...values, [name]: value })
    }

    useEffect(() => {
        dispatch(actions.logOut()) //reset state and clear any errors
    }, [dispatch])


    if (isLoggedIn) return <Redirect to="/Home" />

    return (
        <div>
            <div bp="grid 4">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </div>
        </div>
    )
}