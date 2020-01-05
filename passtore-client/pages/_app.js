import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import LoadingBar from '../components/Loadingbar.js'

import { Provider } from 'mobx-react'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import 'toastr/build/toastr.min.css'
import 'bootstrap-toggle/css/bootstrap2-toggle.min.css'
import '../public/skins/darkly.min.css'
import '../public/style.css'

import AuthStore from '../store/AuthStore.js'
import ServerStore from '../store/ServerStore.js'
import LoadingStore from '../store/LoadingStore.js'
import VendorStore from '../store/VendorStore.js'
import UserStore from '../store/UserStore.js'

export default class MyApp extends App {

	constructor() {

		super()

		this.loadingStore = new LoadingStore()
		this.serverStore = new ServerStore(this.loadingStore)
		this.authStore = new AuthStore(this.loadingStore)
		this.vendorStore = new VendorStore(this.loadingStore)
		this.userStore = new UserStore(this.loadingStore)
	}

	render() {

		const { Component, pageProps } = this.props

		return (
			<div>

				<Head>
					<title>Passtore</title>
				</Head>

				<Provider loadingStore={this.loadingStore}>
					<LoadingBar loadingStore={this.loadingStore} />
					<Provider authStore={this.authStore}>
						<Provider serverStore={this.serverStore}>
							<Provider vendorStore={this.vendorStore}>
								<Provider userStore={this.userStore}>
									<Component {...pageProps} />
								</Provider>
							</Provider>
						</Provider>
					</Provider>
				</Provider>
			</div>
		)
	}

}