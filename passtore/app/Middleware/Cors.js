'use strict'

class Cors{

  *handle (request, response , next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    yield next
  }
}
module.exports = Cors
