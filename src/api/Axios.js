import axios from "axios";

const instance = axios.create({
    baseURL: 'http://52.78.72.117:8080'
})

export default instance;