'use strict'

const Encryption = use('Encryption')
const User = use('App/Models/User')
const Hash = use('Hash')

const ObjectID = require('mongodb').ObjectID

class UserController {

	async login({ auth, request }) {
		const { email, password } = request.all()
		return await auth.attempt(email, password)
	}

	async register({ auth, request }) {
		await User.create({
			email: 'g13@pomscloud.ie',
			password: 'sdsdsd'
		})
	}

	async logout({ auth, request, response }) {
		try {
			const check = await auth.check();

			if (check) {
				const token = await auth.getAuthHeader();
				await auth.authenticator('jwt').revokeTokens([token]);
				return response.status(200).send({ message: 'Logout successfully!' });
			}
		} catch (error) {
			return response.send({ message: 'Invalid jwt token' });
		}
	}

	async getUser({ auth, params }) {
		return await auth.getUser()
	}

	/**
	 * Show a list of all users.
	 * GET vendors
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		return await User.all()
	}

	/**
	 * Create/save a new service.
	 * POST services
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async store({ request, response }) {
        const query = {
            _id: new ObjectID(request.input('_id'))
        }

        const values = {
            name: request.input('name'),
            email: request.input('email'),
            role: request.input('role')
        }

        return await User.updateOrCreate(query, values)
	}

}

module.exports = UserController
