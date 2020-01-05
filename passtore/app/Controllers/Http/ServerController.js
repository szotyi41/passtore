'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Server = use('App/Models/Server')

const ObjectID = require('mongodb').ObjectID

/**
 * Resourceful controller for interacting with servers
 */
class ServerController {
	/**
	 * Show a list of all servers.
	 * GET servers
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 * @param {View} ctx.view
	 */
	async index({ request, response, view }) {
		return await Server.all()
	}

	/**
	 * Create/save a new server.
	 * POST servers
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
        local_ip: request.input('local_ip'),
        global_ip: request.input('global_ip'),
        domains: request.input('domains'),
        services: request.input('services'),
        comment: request.input('comment')
    }

    return await Server.updateOrCreate(query, values)
	}

	/**
	 * Delete a server with id.
	 * DELETE servers/:id
	 *
	 * @param {object} ctx
	 * @param {Request} ctx.request
	 * @param {Response} ctx.response
	 */
	async destroy({ params, request, response }) {
    const server = await Server.findOrFail(params.id)
    return await server.delete()
  }

  async removeService({ params, request, response }) {
    return await Server.where('_id', new ObjectID(params.serverId))
      .where('services._id', params.serviceId)
      .update({'services.$.removed': true})
  }

  async removeDomain({ params, request, response }) {
    return await Server.where('_id', new ObjectID(params.serverId))
      .where('domains._id', params.domainId)
      .update({'domains.$.removed': true})
  }
}

module.exports = ServerController
