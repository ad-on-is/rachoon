// import User from '../../app/Models/User'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
// import { faker } from '@faker-js/faker'
// import Organization from '../../app/Models/Organization'
// import Client from '../../app/Models/Client'
export default class extends BaseSeeder {
  public async run() {
    // const orga = await Organization.create({
    //   name: faker.company.name(),
    // })
    // const user = await User.create({
    //   email: 'adis.durakovic@gmail.com',
    //   password: 'test',
    //   role: 'admin',
    //   organizationId: orga.id,
    //   data: {
    //     username: faker.internet.userName(),
    //     fullName: faker.name.fullName(),
    //     avatar: faker.internet.avatar(),
    //   },
    // })
    // const client = await Client.createMany(
    //   Array(10)
    //     .fill(0)
    //     .map(() => ({
    //       name: faker.company.name(),
    //       number: 'CL-' + faker.random.numeric(3) + '-' + faker.random.numeric(2),
    //       organizationId: orga.id,
    //       data: {
    //         info: {
    //           vat: faker.address.countryCode() + '-' + faker.random.numeric(10),
    //         },
    //         address: {
    //           street: faker.address.street(),
    //           zip: faker.address.zipCode(),
    //           city: faker.address.city(),
    //           country: faker.address.country(),
    //         },
    //         contactPerson: {
    //           fullName: faker.name.fullName(),
    //           email: faker.internet.email(),
    //         },
    //       },
    //     }))
    // )
    // Write your database queries inside the run method
  }
}
