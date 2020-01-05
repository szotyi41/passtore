import axios from 'axios'
import Router from 'next/router'

axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3333'

// Use token
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = 'Bearer ' + token
    return config
})

// Go to login page when unauthorized
axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        Router.push('/login')
    }
    return error
})

export default axios