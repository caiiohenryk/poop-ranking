import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://poop-app.onrender.com'
})