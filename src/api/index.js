import axios from "axios";

// if development mode use another separate server for api
const _API_ = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:5071' : '';

const getRequest = async (route, jwt = null, alt = []) => {
    const response = await axios({
        method: 'get',
        headers: {
            "Access-Control-Allow-Origin": "*",
            ...(jwt ? {'Authorization': `Bearer ${jwt}`} : {})
        },
        url: `${_API_}/api/v1/${route}`,
    });

    return response.status === 200 ? response.data : alt;
}

export async function loadTopDestinations() {
    return await getRequest('stats/popular-destinations');
}

export async function loadMostActiveuMembers() {
    return await getRequest('stats/active-users');
}

export async function loadTrips() {
    return await getRequest('trips');
}

export async function loadMembers() {
    return await getRequest('users');
}

export async function loadMyTrips(jwt) {
    return await getRequest('my-trips', jwt);
}

export async function loadProfile(jwt) {
    return await getRequest('my-profile', jwt);
}

export async function login(credentials) {
    const response = await axios({
        method: 'post',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: `${_API_}/api/v1/auth/login`,
        data: credentials
    });

    return response;
}

export async function register(credentials) {
    const response = await axios({
        method: 'post',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: `${_API_}/api/v1/auth/register`,
        data: credentials
    });

    return response;
}

export async function profileUpdate(credentials, jwt) {
    const response = await axios({
        method: 'put',
        headers: {
            "Access-Control-Allow-Origin": "*",
            ...(jwt ? {'Authorization': `Bearer ${jwt}`} : {})
        },
        url: `${_API_}/api/v1/user/${credentials.id}`,
        data: credentials
    });

    return response;
}