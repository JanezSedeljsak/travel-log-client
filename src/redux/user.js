const axios = require('axios')

// Actions
const SET_USER = 'redux/users/SET_USER'
const LOG_OUT = 'redux/users/LOG_OUT'
const SIGN_IN = 'redux/users/SIGN_IN'
const SIGN_UP = 'redux/users/SIGN_UP'
const SIGN_UP_COMPLETE = 'redux/users/SIGN_UP_COMPLETE'
const SET_LOGIN_ERROR = 'redux/users/SET_LOGIN_ERROR'
const SET_SIGNUP_ERROR = 'redux/users/SET_SIGNUP_ERROR'

// Reducer

const initialState = {
    profileName: null,
    isLoggedIn: false,
    isFetching: false,
    jwt: null,
    loginError: null,
    signupError: null
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
                signupError: null
            }
        case SIGN_UP_COMPLETE:
            return {
                ...state,
                isFetching: false,
                signupError: null
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
                signupError: action.payload.error
            }
        default:
            return state
    }
}

export default currentUser


// Action Creators
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

const setSignupError = error => {
    return {
        type: SET_SIGNUP_ERROR,
        payload: { error }
    }
}

const signIn = user => async dispatch => {
    dispatch({ type: SIGN_IN });
    const params = {
        email: user.username,
        password: user.password
    }

    console.log(params);
    const response = await axios({
        method: 'post',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: 'http://localhost:5071/api/v1/auth/login ',
        data: params
    });

    console.log(response);
    if (response) {
        dispatch(setUser({
            username: user.email,
            jwt: response.data.token
        }))
    }
}

const signUp = (userObj) => dispatch => {
    dispatch({
        type: SIGN_UP
    });

    const params = {
        email: userObj.username,
        password: userObj.password
    };
    console.log(params);

    axios({
        method: 'post',
        url: 'http://localhost:3000/api/user/register ',
        data: params
    })
        .then(function (response) {
            // handle success
            if (response.data.userId) {
                dispatch({
                    type: SIGN_UP_COMPLETE
                })
                dispatch(signIn(userObj)) //Auto login on successful register
            }
        })
        .catch(function (error) {
            // handle error
            let errorMessage = 'Network Error'
            if (error.response) {
                errorMessage = error.response.data.message
                errorMessage = errorMessage === 'USERNAME_IS_NOT_AVAILABLE' ? 'Username/Email is not available' : errorMessage
            }
            dispatch(setSignupError(errorMessage))

        })
        .then(function () {
            // always executed
        })
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
    signIn,
    signUp,
    setLoginError,
    setSignupError,
    getProfile
}
