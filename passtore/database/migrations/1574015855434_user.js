'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('Users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('role', 10).notNullable()
      table.string('permitted')
      table.timestamps()
    })
  }

  down () {
    this.drop('Users')
  }
}

module.exports = UserSchema
