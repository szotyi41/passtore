'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('login')

Route.post('login', 'UserController.login').middleware('guest')
Route.get('register', 'UserController.register').middleware('guest')
Route.post('logout', 'UserController.logout').middleware('auth')
Route.get('user', 'UserController.get').middleware('auth')
//

// Server routes
Route.resource('server', 'ServerController').middleware('auth')
Route.delete('service/:serverId/:serviceId', 'ServerController.removeService').middleware('auth')
Route.delete('domain/:serverId/:domainId', 'ServerController.removeDomain').middleware('auth')

// Domain routes
Route.get('domain/checkSSL', 'DomainController.checkSSL').middleware('auth')

Route.match(['options'],'*', function () {
  return 'allowed'
})
