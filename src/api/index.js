import axios from "axios";

export async function loadDestinations() {
    const response = await axios({
        method: 'get',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: 'http://localhost:5071/api/v1/popular-destinations',
    });

    return response.status === 200 ? response.data : [];
}

export async function loadMyTrips() {
    const response = await axios({
        method: 'get',
        headers: {"Access-Control-Allow-Origin": "*"},
        url: 'http://localhost:5071/api/v1/popular-destinations',
    });

    return response.status === 200 ? response.data : [];
}