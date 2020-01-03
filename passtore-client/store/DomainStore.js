import { observable, action, computed, toJS, inject, extendObservable, get, set} from 'mobx'
import axios from 'axios'
import { ObjectID } from 'bson'

// Abstract
export default class DomainStore {

    constructor(loadingStore, authStore) {
        this.loadingStore = loadingStore
    }

    // Mutations
    @action addDomain() {
        this.server.services.push({
            _id: new ObjectID().toString(),
            name: '',
            aliases: [],
        })
    }

    @action setDomain(domain, field, value) {
        const index = this.server.domains.map(s => s._id).indexOf(domain._id)
        domain[field] = value
        set(this.server.domains, index, service)
    }

    // Call actions
    @action removeDomain(domain_id) {
		this.loading = true
		this.loadingStore.start()
		return axios.delete('http://localhost:3333/domain/' + this.server._id + '/' + domain_id).then(response => {
			this.findOrCreateServer(response.data)
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
    }

    @action checkSSL(domain) {
		this.loading = true
		this.loadingStore.start()
		return axios.delete('http://localhost:3333/domain/checkSSL/' + domain.name).then(response => {
			this.findOrCreateServer(response.data)
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
    }

}