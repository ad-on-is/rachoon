/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Hash from '@ioc:Adonis/Core/Hash'
import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('', 'RootController').only(['index'])
  Route.get('password/generate', async ({ response, request }) => {
    const randomPassword = Math.random().toString(36).slice(-8)
    const pass = request.qs()['pass'] || randomPassword
    const hash = await Hash.make(pass)
    return response.send({ password: pass, hash: hash })
  })
  Route.resource('run/recurring', 'RunRecurringInvoicesController').only(['index'])
  Route.resource('info', 'InfoController').only(['index'])
  Route.resource('auth', 'AuthController')
    .only(['store', 'destroy'])
    .middleware({ destroy: ['auth'] })
  Route.group(() => {
    Route.resource('invoices/recurring', 'RecurringInvoicesController')
    Route.get('documents/duplicate/:id', 'DocumentsController.duplicate')
    Route.resource('number/:type', 'NumbersController').only(['index'])
    Route.resource('documents/status', 'DocumentsStatusController').only(['update'])
    Route.resource('documents', 'DocumentsController').apiOnly()
    Route.get('clients/autocomplete', 'ClientsController.autocomplete')
    Route.resource('clients', 'ClientsController').apiOnly()
    Route.get('templates/default', 'TemplatesController.default')
    Route.get('templates/duplicate/:id', 'TemplatesController.duplicate')
    Route.resource('templates', 'TemplatesController').apiOnly()
    Route.resource('dashboard', 'DashboardController').only(['index'])
    Route.resource('users', 'UsersController').apiOnly()
    Route.resource('organizations', 'OrganizationsController').only(['store'])
    Route.resource('render', 'RenderController').only(['store'])
    Route.resource('profile', 'ProfileController').only(['index', 'store'])
    Route.resource('tokens', 'TokensController').only(['index', 'store', 'destroy'])
  }).middleware(['auth'])
  // TODO: create an internal only middleware, where it checks for a specific header or token
  Route.resource('register', 'RegisterController').only(['store'])
}).prefix('api')
