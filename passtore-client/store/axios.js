import axios from 'axios'
import Router from 'next/router'

axios.defaults.baseURL = 'http://localhost:3333'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

axios.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        Router.push('/login')
    }
    return error
})

export default axios