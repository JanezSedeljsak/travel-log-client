import axios from "axios";

// if development mode use another separate server for api
const _API_ = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'http://localhost:5071' : '';

axios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
       window.location = '/login?status=401';
   }
   return error;
});

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