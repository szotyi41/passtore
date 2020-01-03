import { observable, action, computed, toJS, inject, extendObservable, get, set} from 'mobx'
import axios from 'axios'
import { ObjectID } from 'bson'

import DomainStore from './DomainStore.js'
import ServiceTypes from './ServiceTypes.js'

// Abstract
export default class ServiceStore extends DomainStore {

    constructor(loadingStore, authStore) {

        // Call Domain Store constructor
        super(loadingStore, authStore)

        this.loadingStore = loadingStore
        this.serviceTypes = ServiceTypes
    }

    getDefaultFields(type) {
        const auth = { username: '', password: '' }
        const host = { host: this.server.local_ip }
        const fields = {
            htaccess: { type: 'htaccess', ...auth },
            ssh: { type: 'ssh', command_pattern: 'ssh {username}@{host}:{port}', command: '', port: 22, ...host, ...auth },

            // Databases
            mysql: { type: 'mysql', command_pattern: 'mysql -h {host}:{port} -u {username} -p {password}', command: '', port: 3306, database: '', ...host, ...auth },
            mongodb: { type: 'mongodb', command_pattern: 'mongo --host {host} --port {port} --username {username} --password {password}', command: '', port: 27017, database: '', ...host, ...auth },
            redis: { type: 'redis', command_pattern: 'redis-cli -a {auth}', command: '', port: 6379, auth: '', ...host },

            // Control panels
            ispconfig: { type: 'ispconfig', port: 8080, ...host, ...auth },

            // Firewalls
            pfsense: { type: 'pfsense', port: 80, ...host, ...auth },

            // Monitoring
            ichinga: { type: 'ichinga', port: 80, ...host, ...auth },
            nagios: { type: 'nagios', port: 80, ...host, ...auth },
            munin: { type: 'munin', port: 80, ...auth },

            // Storage
            ftp: { type: 'ftp', command_pattern: 'ftp {username}@{host}:{port}', command: '', port: 21, passive: false, ...host, ...auth },
            aws: { type: 'aws', command_pattern: 'https://s3.{region}.amazonaws.com/{bucket}', command: '', bucket: '', access: '', secret: '', region: '', bucket: '', ...auth, },
            azure: { type: 'azure', address: '', name: '', key: '', container: '', connection_string: '' },

            // Version control
            git: { type: 'git', command_pattern: 'git clone https://{username}:{password}@{host}:{port}/{repository}.git', command: '', repository: '', ...host, ...auth },
            svn: { type: 'svn', command_pattern: '', command: '', repository: '', },

            // VPN
            vpn: { type: 'vpn', command_pattern: '', command: '', ...auth }

        }
        return fields[type]
    }

    // Mutations
    @action addService() {
        this.server.services.push({
            _id: new ObjectID().toString(),
            enabled: true,
            status: '',
            type: '',
            name: 'New Service',
            comment: ''
        })
    }

    @action setServiceType(service) {
        const index = this.server.services.map(s => s._id).indexOf(service._id)
        set(this.server.services, index, {
            ...this.server.services[index],
            ...this.getDefaultFields(service.type)
        })
    }

    @action setService(service, field, value) {
        const index = this.server.services.map(s => s._id).indexOf(service._id)
        service[field] = value
        set(this.server.services, index, service)
    }

    // Call actions
    @action removeService(service_id) {
		this.loading = true
		this.loadingStore.start()
		return axios.delete('http://localhost:3333/service/' + this.server._id + '/' + service_id).then(response => {
			this.findOrCreateServer(response.data)
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
    }

}