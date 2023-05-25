/**
 * Config source: https://git.io/JY0mp
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import { AuthConfig } from '@ioc:Adonis/Addons/Auth'

/*
|--------------------------------------------------------------------------
| Authentication Mapping
|--------------------------------------------------------------------------
|
| List of available authentication mapping. You must first define them
| inside the `contracts/auth.ts` file before mentioning them here.
|
*/
const authConfig: AuthConfig = {
  guard: 'api',
  guards: {
    /*
    |--------------------------------------------------------------------------
    | OAT Guard
    |--------------------------------------------------------------------------
    |
    | OAT (Opaque access tokens) guard uses database backed tokens to authenticate
    | HTTP request. This guard DOES NOT rely on sessions or cookies and uses
    | Authorization header value for authentication.
    |
    | Use this guard to authenticate mobile apps or web clients that cannot rely
    | on cookies/sessions.
    |
    */
    api: {
      driver: 'oat',

      /*
      |--------------------------------------------------------------------------
      | Tokens provider
      |--------------------------------------------------------------------------
      |
      | Uses SQL database for managing tokens. Use the "database" driver, when
      | tokens are the secondary mode of authentication.
      | For example: The Github personal tokens
      |
      | The foreignKey column is used to make the relationship between the user
      | and the token. You are free to use any column name here.
      |
      */
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'user_id',
      },

      provider: {
        /*
        |--------------------------------------------------------------------------
        | Driver
        |--------------------------------------------------------------------------
        |
        | Name of the driver
        |
        */
        driver: 'lucid',

        /*
        |--------------------------------------------------------------------------
        | Identifier key
        |--------------------------------------------------------------------------
        |
        | The identifier key is the unique key on the model. In most cases specifying
        | the primary key is the right choice.
        |
        */
        identifierKey: 'id',

        /*
        |--------------------------------------------------------------------------
        | Uids
        |--------------------------------------------------------------------------
        |
        | Uids are used to search a user against one of the mentioned columns. During
        | login, the auth module will search the user mentioned value against one
        | of the mentioned columns to find their user record.
        |
        */
        uids: ['email'],

        /*
        |--------------------------------------------------------------------------
        | Model
        |--------------------------------------------------------------------------
        |
        | The model to use for fetching or finding users. The model is imported
        | lazily since the config files are read way earlier in the lifecycle
        | of booting the app and the models may not be in a usable state at
        | that time.
        |
        */
        model: () => import('App/Models/User'),
      },
    },
  },
}

export default authConfig
