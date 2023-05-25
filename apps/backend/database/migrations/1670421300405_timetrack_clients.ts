import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('time_tracks', (table) => {
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('SET NULL')
      table.index('client_id')
    })
  }

  public async down() {
    this.schema.alterTable('time_tracks', (table) => {
      table.dropIndex('client_id')
      table.dropColumn('client_id')
    })
  }
}
