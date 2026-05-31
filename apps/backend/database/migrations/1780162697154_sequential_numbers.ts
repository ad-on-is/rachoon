import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  public async up() {
    this.schema.alterTable('documents', (table) => {
      table.integer('sequence').unsigned().nullable()
      table.index('sequence')
      table.unique(['organization_id', 'type', 'sequence'])
    })
    this.schema.alterTable('clients', (table) => {
      table.integer('sequence').unsigned().nullable()
      table.index('sequence')
      table.unique(['organization_id', 'sequence'])
    })
  }

  public async down() {
    this.schema.alterTable('documents', (table) => {
      table.dropIndex('sequence')
      table.dropUnique(['organization_id', 'type', 'sequence'])
      table.dropColumn('sequence')
    })
    this.schema.alterTable('clients', (table) => {
      table.dropIndex('sequence')
      table.dropUnique(['organization_id', 'sequence'])
      table.dropColumn('sequence')
    })
  }
}
