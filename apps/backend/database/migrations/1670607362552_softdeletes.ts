import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tables = ['projects', 'time_tracks']

  public async up() {
    this.tables.map((t) => {
      this.schema.alterTable(t, (table) => {
        table.timestamp('deleted_at', { useTz: true }).nullable()
      })
    })
  }

  public async down() {
    this.tables.map((t) => {
      this.schema.alterTable(t, (table) => {
        table.dropColumn('deleted_at')
      })
    })
  }
}
