import axios from 'axios';
import { decodeRequest, encodeRequest } from "../request.model";

const dotenv = require('dotenv');
dotenv.config();
const centralDatabaseAPI = process.env.REACT_APP_CENTRAL_DATABASE_API;

export const getRequest = async (id) => {
    let request = await axios.get(`${centralDatabaseAPI}/Requests/${id}`)
        .then(response => {
            console.log(response.data);
            return decodeRequest(response.data);
        });
    console.log("Raspuns de la server");
    console.log(request);
    return request;
}

export const putRequest = async (id, payload) => {
    return await axios.put(`${centralDatabaseAPI}/Requests/${id}`, { payload: btoa(JSON.stringify(payload)) });
}

export const deleteRequest = async (id) => {
    return await axios.delete(`${centralDatabaseAPI}/Requests/${id}`);
}