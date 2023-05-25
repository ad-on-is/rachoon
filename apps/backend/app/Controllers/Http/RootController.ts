import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import OrganizationHelper from 'App/Helpers/organization'
export default class AuthController {
  public async index(ctx: HttpContextContract) {
    const organizationId = await OrganizationHelper.getFromOrigin(ctx)
    if (!organizationId) {
      return ctx.response.notFound('No organization')
    } else {
      return organizationId
    }
  }
}
