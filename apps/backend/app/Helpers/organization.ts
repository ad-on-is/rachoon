import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Organization from 'App/Models/Organization'
import HashIDs from './hashids'

export default class OrganizationHelper {
  public static async getFromOrigin(ctx: HttpContextContract) {
    const getURIParts = (url) => {
      const matches = url.match(/^(\w+?:\/\/)?([\w-\.]+(?=\/?))?:?(\d*)?([^:]*)/)
      return matches
        ? {
            scheme: matches[1],
            host: matches[2],
            port: matches[3],
            pathname: matches[4],
          }
        : {
            scheme: 'https://',
            host: 'rachoon.work',
            port: '',
            pathname: '',
          }
    }

    const ref = ctx.request.header('origin')

    if (ref) {
      const { host } = getURIParts(ref)
      const slug = host.split('.')[0]
      const organization = await Organization.query().where({ slug: slug }).first()
      if (organization) {
        return {
          slug: slug,
          name: organization.name,
          id: HashIDs.encode(organization.id),
          logo: organization.data.logo,
        }
      }
      return {}
    }
    return {}
  }
}
