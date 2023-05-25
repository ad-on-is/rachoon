import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const { ModelQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')

    ModelQueryBuilder.macro('getCount', async function () {
      const result = await this.count('* as total')
      return BigInt(result[0].$extras.total ? result[0].$extras.total : result[0].$original.total)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
