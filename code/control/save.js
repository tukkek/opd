import * as savem from '../../libraries/save.js'
import * as clientm from '../control/client.js'
import * as exitm from '../control/exit.js'

class Manager extends savem.Manager{
  constructor(){super('#save','#load')}

  save(){
    let dungeon=clientm.dungeon
    super.save(dungeon,`${dungeon.name}.json`)
    exitm.save()
  }

  async load(){
    let data=await super.load()
    clientm.load(data)
    return Promise.resolve()
  }
}

export function ready(){new Manager().ready()}
