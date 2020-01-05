import { observable, action, computed, toJS, inject } from 'mobx'
import axios from 'axios'

export default class UserStore {

	constructor(loadingStore) {

		this.loadingStore = loadingStore

		this.defaultUser = {
            _id: '',
            name: '',
            email: '',
			role: '',
			password: '',
			password_again: '',
			newuser: true
		}
	}

	@observable loading = false
	@observable searchText = ''
	@observable users = []
	@observable user = this.defaultUser
	olduser = {}

	// Mutations
	@action setUser(user) {
		this.user = user
	}

	@action setOldUser(user) {
		this.olduser = toJS(user)
	}

	@action setUsers(users) {
		this.users.replace(users)
	}

	@action findOrCreateUser(user) {
		const index = this.users.map(user => user._id).indexOf(user._id)
		if (index !== -1) this.users[index] = user
		else this.users.push(user)
	}

	@action findAndRemoveUser(user) {
		const index = this.users.map(user => user._id).indexOf(user._id)
		if (index !== -1) this.users.splice(index, 1)
	}

	@action setSearchText(searchText) {
		this.searchText = searchText
	}

    @action setUserField(user, field, value) {
        user[field] = value
        this.setUser(user)
    }

	// Computed
	@computed get usersFiltered() {
		const searchText = this.searchText.toLowerCase();
		return this.users.filter(user => {
			return (
				user.name.toLowerCase().indexOf(searchText) !== -1 ||
				user.email.indexOf(searchText) !== -1
			)
		})
	}

	// Call Actions
	@action getUsers() {
		this.loading = true
		this.loadingStore.start()
		return axios.get('users').then(action(response => {
			this.setUsers(response.data)
		})).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}

	@action saveUser() {
		this.loading = true
		this.loadingStore.start()
		return axios.post('users', toJS(this.user)).then(response => {
			this.findOrCreateUser(response.data)
			this.user = response.data
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}

	@action removeUser() {
		this.loading = true
		this.loadingStore.start()
		return axios.delete('users/' + this.user._id).then(response => {
			this.findAndRemoveUser(this.user)
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}
}
