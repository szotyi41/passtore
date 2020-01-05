import { observable, action, computed, toJS, inject } from 'mobx'
import axios from 'axios'

import ServiceStore from './ServiceStore'

export default class ServerStore extends ServiceStore {

	constructor(loadingStore, authStore) {

		// Call Service Store constructor
		super(loadingStore, authStore)

		this.loadingStore = loadingStore

		this.defaultServer = {
			_id: '',
			vendor_id: '',
			virtual_id: '',
			enabled: true,
			status: '',
			name: '',
			color: '',
			local_ip: '',
			global_ip: '',
			services: [],
			domains: [],
			comment: ''
		}
	}

	@observable loading = false
	@observable searchText = ''
	@observable servers = []
	@observable server = this.defaultServer
	oldserver = {}

	// Mutations
	@action setServer(server) {
		this.server = server
	}

	@action setOldServer(server) {
		this.oldserver = toJS(server)
	}

	@action setServers(servers) {
		this.servers.replace(servers)
	}

	@action findOrCreateServer(server) {
		const index = this.servers.map(server => server._id).indexOf(server._id)
		if (index !== -1) this.servers[index] = server
		else this.servers.push(server)
	}

	@action findAndRemoveServer(server) {
		const index = this.servers.map(server => server._id).indexOf(server._id)
		if (index !== -1) this.servers.splice(index, 1)
	}

	@action setSearchText(searchText) {
		this.searchText = searchText
	}

    @action setServerField(server, field, value) {
        server[field] = value
        this.setServer(server)
    }

	// Computed
	@computed get serversFiltered() {
		const searchText = this.searchText.toLowerCase();
		return this.servers.filter(server => {
			return (
				server.name.toLowerCase().indexOf(searchText) !== -1 ||
				server.local_ip.indexOf(searchText) !== -1 ||
				server.global_ip.indexOf(searchText) !== -1 ||
				server.services.some(service => service.name.indexOf(searchText) !== -1 || service.type === searchText) ||
				server.domains.some(domain => domain.name.indexOf(searchtext) !== -1)
			)
		}).map(server => ({ ...server, services: server.services.filter(service => service.removed !== true)}))
	}

	// Call Actions
	@action getServers() {
		this.loading = true
		this.loadingStore.start()
		return axios.get('server').then(action(response => {
			this.setServers(response.data)
		})).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}

	@action saveServer() {
		this.loading = true
		this.loadingStore.start()
		return axios.post('server', toJS(this.server)).then(response => {
			this.findOrCreateServer(response.data)
			this.server = response.data
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}

	@action removeServer() {
		this.loading = true
		this.loadingStore.start()
		return axios.delete('server/' + this.server._id).then(response => {
			this.findAndRemoveServer(this.server)
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}
}
