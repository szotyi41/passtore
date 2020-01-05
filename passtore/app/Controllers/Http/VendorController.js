'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Vendor = use('App/Models/Vendor')

const ObjectID = require('mongodb').ObjectID

/**
 * Resourceful controller for interacting with vendors
 */
class VendorController {
	/**
	 * Show a list of all vendors.
	 * GET vendors
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
    async index({ request, response, view }) {
        return await Vendor.all()
    }

	/**
	 * Create/save a new vendor.
	 * POST vendors
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
            color: request.input('color'),
            ip: request.input('ip'),
            username: request.input('username'),
            password: request.input('password'),
            command: request.input('command'),
            comment: request.input('comment')
        }

        return await Vendor.updateOrCreate(query, values)
    }

	/**
	 * Delete a vendor with id.
	 * DELETE vendors/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
    async destroy({ params, request, response }) {
        const vendor = await Vendor.findOrFail(params.id)
        return await vendor.delete()
    }

}

module.exports = VendorController
