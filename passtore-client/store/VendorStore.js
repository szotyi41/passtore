import { observable, action, computed, toJS, inject } from 'mobx'
import axios from 'axios'

export default class VendorStore {

	constructor(loadingStore) {

		this.loadingStore = loadingStore

		this.defaultVendor = {
			_id: '',
			enabled: true,
			status: '',
			name: '',
			color: '',
            ip: '',
            username: '',
            password: '',
            command: '',
			comment: ''
		}
	}

	@observable loading = false
	@observable searchText = ''
	@observable vendors = []
	@observable vendor = this.defaultVendor
	oldvendor = {}

	// Mutations
	@action setVendor(vendor) {
		this.vendor = vendor
	}

	@action setOldVendor(vendor) {
		this.oldvendor = toJS(vendor)
	}

	@action setVendors(vendors) {
		this.vendors.replace(vendors)
	}

	@action findOrCreateVendor(vendor) {
		const index = this.vendors.map(vendor => vendor._id).indexOf(vendor._id)
		if (index !== -1) this.vendors[index] = vendor
		else this.vendors.push(vendor)
	}

	@action findAndRemoveVendor(vendor) {
		const index = this.vendors.map(vendor => vendor._id).indexOf(vendor._id)
		if (index !== -1) this.vendors.splice(index, 1)
	}

	@action setSearchText(searchText) {
		this.searchText = searchText
	}

    @action setVendorField(vendor, field, value) {
        vendor[field] = value
        this.setVendor(vendor)
    }

	// Computed
	@computed get vendorsFiltered() {
		const searchText = this.searchText.toLowerCase();
		return this.vendors.filter(vendor => {
			return (
				vendor.name.toLowerCase().indexOf(searchText) !== -1 ||
				vendor.ip.indexOf(searchText) !== -1
			)
		})
	}

	// Call Actions
	@action getVendors() {
		this.loading = true
		this.loadingStore.start()
		return axios.get('vendor').then(action(response => {
			this.setVendors(response.data)
		})).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}

	@action saveVendor() {
		this.loading = true
		this.loadingStore.start()
		return axios.post('vendor', toJS(this.vendor)).then(response => {
			this.findOrCreateVendor(response.data)
			this.vendor = response.data
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}

	@action removeVendor() {
		this.loading = true
		this.loadingStore.start()
		return axios.delete('vendor/' + this.vendor._id).then(response => {
			this.findAndRemoveVendor(this.vendor)
		}).finally(() => {
			this.loadingStore.completed()
			this.loading = false
		})
	}
}
