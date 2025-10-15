import '../../libraries/range.js'
import '../../libraries/array.js'
import * as mapm from '../view/map.js'
import * as textm from '../view/text.js'
import * as tablesm from '../view/tables.js'
import * as dungeonm from '../model/dungeon.js'
import * as savem from '../control/save.js'
import * as exitm from '../control/exit.js'

const MODULES=[mapm,textm,savem,tablesm,exitm]

export var dungeon=new dungeonm.Dungeon()

export function create(){
  mapm.draw()
  dungeon.resize(mapm.rooms.length)
  textm.draw()
  tablesm.draw()
}

export function ready(){
  for(let module of MODULES) module.ready()
  create()
}

export function load(data){
  dungeon=dungeonm.load(data)
  create()
}
