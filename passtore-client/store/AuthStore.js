import { observable, action } from 'mobx'
import axios from 'axios'

export default class AuthStore {
    
  @observable loading = false
  @observable email = ''
  @observable password = ''
  @observable loggedIn = false
  @observable invalid = false
  @observable token = ''
  @observable user = {}

  @action setUser(user) {
    this.user = user
  }

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
      this.invalid = false
      localStorage.setItem('token', response.data.token)
      axios.post('user').then(response => {
        this.setUser(response.data)
        this.loggedIn = true
      })
    }).catch(error => {
        this.invalid = true
    }).finally(() => {
        this.loading = false
    })
  }

  @action logout() {
    axios.post('user').then(response => {
      this.setUser(response.data)
      this.loggedIn = true
    })
    /* this.inProgress = true;
    return axios.post('logout', {}).then(response => {
        this.loggedIn = false
    }).catch(error => {
        console.log(error)
    }).finally(() => {
        this.inProgress = false
    }) */
  } 
}
