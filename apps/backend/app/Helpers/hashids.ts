import Env from '@ioc:Adonis/Core/Env'
import Hashids from 'hashids'

export default class HashIDs {
  public static encode(val: number) {
    const hids = new Hashids(Env.get('APP_KEY'), 10)
    return hids.encode(val)
  }

  public static decode(val: string) {
    const hids = new Hashids(Env.get('APP_KEY'), 10)
    return Number(hids.decode(val)[0])
  }
}
