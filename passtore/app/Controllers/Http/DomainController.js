'use strict'

const sslChecker = require('ssl-checker')

class DomainController {
  async checkSSL({ request, response }) {
    const host = request.input('host')
    return await sslChecker(host)
  }
}

module.exports = DomainController
