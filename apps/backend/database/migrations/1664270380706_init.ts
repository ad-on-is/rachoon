import { DateTime } from 'luxon'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  public async up() {
    this.schema.createTable('organizations', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('slug', 255).notNullable()
      table.jsonb('data').defaultTo('{}')
      table.jsonb('settings').defaultTo('{}')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })

    this.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('role', 10).notNullable()
      table.jsonb('data').defaultTo('{}')
      table.jsonb('settings').defaultTo('{}')
      table.string('remember_me_token').nullable()
      table
        .integer('organization_id')
        .unsigned()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.index('organization_id')
    })

    this.schema.createTable('api_tokens', (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('type').notNullable()
      table.string('token', 64).notNullable().unique()

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('expires_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })

    this.schema.createTable('clients', (table) => {
      table.increments('id').primary()
      table.string('name', 255).notNullable()
      table.string('number', 100)
      table.jsonb('data').defaultTo('{}')
      table
        .integer('organization_id')
        .unsigned()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('deleted_at', { useTz: true }).nullable()

      table.index('organization_id')
      table.unique(['organization_id', 'number'])
    })

    this.schema.createTable('invoice_or_offers', (table) => {
      table.increments('id').primary()
      table.string('type', 10)
      table.string('number', 100)
      table.string('status', 10)
      table.jsonb('data').defaultTo('{}')
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE')
      table
        .integer('organization_id')
        .unsigned()
        .references('id')
        .inTable('organizations')
        .onDelete('CASCADE')

      table.index('client_id')
      table.index('organization_id')
      table.unique(['organization_id', 'number'])
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(DateTime.now().toSQL())
      table.timestamp('deleted_at', { useTz: true }).nullable()
    })
  }

  public async down() {
    this.schema.dropTable('api_tokens')
    this.schema.dropTable('users')
    this.schema.dropTable('invoice_or_offers')
    this.schema.dropTable('clients')
    this.schema.dropTable('organizations')
  }
}
