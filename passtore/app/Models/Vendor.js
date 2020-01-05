'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const ObjectID = require('mongodb').ObjectID

class Vendor extends Model {
  static boot() {
    super.boot()

    this.addTrait('UpdateOrCreate')
  }
}

module.exports = Vendor
