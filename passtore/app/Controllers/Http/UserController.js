'use strict'

const Encryption = use('Encryption')
const User = use('App/Models/User')
const Hash = use('Hash')

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
        await auth.authenticator("jwt").revokeTokens([token]);
        return response.status(200).send({ message: "Logout successfully!" });
      }
    } catch (error) {
      return response.send({ message: "Invalid jwt token" });
    }
  }

  async get ({ auth, params }) {
    return await User.findOrFail(auth.user._id)
  }

}

module.exports = UserController
