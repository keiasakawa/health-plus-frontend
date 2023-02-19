import axios from 'axios';

const instance = axios.create({
    baseURL: "https://localhost:3000"
})

export {instance};