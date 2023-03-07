import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3000"
})

const isTokenExpired = async () => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("token")
    };
    try {
        await instance.get('/info', {headers: headers});
        return true;
    } catch (err) {
        return false;
    }
}

export { instance, isTokenExpired };
