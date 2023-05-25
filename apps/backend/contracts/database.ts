declare module '@ioc:Adonis/Lucid/Orm' {
  interface ModelQueryBuilderContract<Model extends LucidModel, Result = InstanceType<Model>> {
    getCount(): Promise<BigInt>
  }
}
