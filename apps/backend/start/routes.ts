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

import Route from '@ioc:Adonis/Core/Route'

Route.resource('', 'RootController').only(['index'])

Route.group(() => {
  Route.resource('auth', 'AuthController')
    .only(['store', 'destroy'])
    .middleware({ destroy: ['auth'] })
  Route.group(() => {
    Route.resource('invoicesoroffers/status', 'InvoicesOrOffersStatusController').only(['update'])
    Route.resource('invoicesoroffers', 'InvoicesOrOffersController').apiOnly()
    Route.shallowResource('clients.projects', 'ClientsProjectsController').only(['store', 'index'])
    Route.resource('projects', 'ProjectsController').only(['index', 'destroy'])
    Route.resource('clients.projects.timetracks', 'TimeTracksController').only(['store'])
    Route.resource('timetracks', 'TimeTracksController').only(['index', 'update', 'destroy'])
    Route.resource('clients', 'ClientsController').apiOnly()
    Route.resource('dashboard', 'DashboardController').only(['index'])
    Route.resource('users.projects', 'UsersProjectsController').only(['update', 'destroy', 'index'])
    Route.resource('users', 'UsersController').apiOnly()
    Route.resource('organizations', 'OrganizationsController').only(['store'])
    Route.resource('render', 'RenderController').only(['store'])
    Route.resource('profile', 'ProfileController').only(['index', 'store'])
  }).middleware(['auth'])
  Route.resource('register', 'RegisterController').only(['store'])
}).prefix('api')
