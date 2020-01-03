import { observable, action } from 'mobx'
import axios from 'axios'

export default class AuthStore {
    
  @observable loading = false
  @observable email = ''
  @observable password = ''
  @observable loggedIn = false
  @observable invalid = false
  @observable token = ''

  @action setEmail(email) {
    this.email = email
  }

  @action setPassword(password) {
    this.password = password
  }

  @action reset() {
    this.email = ''
    this.password = ''
  }

  @action getLoggedIn() { 
    return this.loggedIn
  }

  @action login() {
    this.loading = true;
    return axios.post('login', { email: this.email, password: this.password }).then(response => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
        this.loggedIn = true
        this.invalid = false
    }).catch(error => {
        this.invalid = true
    }).finally(() => {
        this.loading = false
    })
  }

  @action logout() {
    this.inProgress = true;
    return axios.post('logout', {}).then(response => {
        this.loggedIn = false
    }).catch(error => {
        console.log(error)
    }).finally(() => {
        this.inProgress = false
    })
  }
}
