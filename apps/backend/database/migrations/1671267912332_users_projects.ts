import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_projects'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('SET NULL')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')

      table.index('project_id')
      table.index('user_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
