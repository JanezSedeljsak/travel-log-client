import axios from 'axios';

const SET_USER = 'redux/users/SET_USER'
const LOG_OUT = 'redux/users/LOG_OUT'
const SIGN_IN = 'redux/users/SIGN_IN'
const SIGN_UP = 'redux/users/SIGN_UP'
const SIGN_UP_COMPLETE = 'redux/users/SIGN_UP_COMPLETE'
const SET_LOGIN_ERROR = 'redux/users/SET_LOGIN_ERROR'
const SET_SIGNUP_ERROR = 'redux/users/SET_SIGNUP_ERROR'

const initialState = {
    profileName: null,
    isLoggedIn: false,
    isFetching: false,
    jwt: null,
    loginError: null,
    registerError: null
}

const currentUser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                profileName: action.payload.username,
                isLoggedIn: true,
                isFetching: false,
                jwt: action.payload.jwt,
                loginError: null
            }
        case LOG_OUT:
            return initialState
        case SIGN_IN:
            return {
                ...state,
                isFetching: true,
                loginError: null
            }
        case SIGN_UP:
            return {
                ...state,
                isFetching: true,
                registerError: null
            }
        case SIGN_UP_COMPLETE:
            return {
                ...state,
                isFetching: false,
                registerError: null
            }
        case SET_LOGIN_ERROR:
            return {
                ...state,
                isFetching: false,
                loginError: action.payload.error
            }
        case SET_SIGNUP_ERROR:
            return {
                ...state,
                isFetching: false,
                registerError: action.payload.error
            }
        default:
            return state
    }
}

export default currentUser

const setUser = userObj => {
    return {
        type: SET_USER,
        payload: userObj
    }
}

const setLoginError = error => {
    return {
        type: SET_LOGIN_ERROR,
        payload: { error }
    }
}

const setRegisterError = error => {
    return {
        type: SET_SIGNUP_ERROR,
        payload: { error }
    }
}

const login = user => async dispatch => {
    dispatch({ type: SIGN_IN });

    const response = await axios({
        method: 'post',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: 'http://localhost:5071/api/v1/auth/login ',
        data: {
            email: user.username,
            password: user.password
        }
    });

    if (response) {
        dispatch(setUser({
            username: user.email,
            jwt: response.data.token
        }))
    }
}

const signUp = user => async dispatch => {
    dispatch({
        type: SIGN_UP
    });

    const response = await axios({
        method: 'post',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: 'http://localhost:5071/api/v1/auth/login ',
        data: {
            email: user.username,
            password: user.password
        }
    });

    if (response) {
        dispatch({type: SIGN_UP_COMPLETE})
        dispatch(login(user))
    }
}

const getProfile = (access_token) => {
    axios({
        method: 'get',
        url: 'http://localhost:3000/api/user/me ',
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            // handle success
            console.log(response)
        })
        .catch(function (error) {
            // handle error
            console.log(error.response)

        })
        .then(function () {
            // always executed
        })
}

const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const actions = {
    setUser,
    logOut,
    login,
    signUp,
    setLoginError,
    setRegisterError,
    getProfile
}
