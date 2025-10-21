import * as tablem from '../../libraries/table.js'

const TRAP=new tablem.Table('Traps',[
  'Mechanical or magical trap guarding a reward',
  'Mechanical or magical trap with hidden-reward',
  'Mechanical or magical trap on a combat-room',
  'Ambush',
  'Mechanical or magical trap',
  'Hidden mechanical or magical trap'
])
const KEY=new tablem.Table('Key',[
  'Key unlocks hard-combat and great-rewards',
  'Key unlocks hard-combat and good-rewards',
  "Key unlocks all of the floor's rewards",
  'Key unlocks mediocre rewards',
  'Key unlocks poor-rewards',
  'Key unlocks access to other floor'
])
const FEATURE=new tablem.Table('Feature',[
  TRAP,
  'Hidden-reward',
  'Brawl or brain test to access a room',
  'Neutral encounter',
  'Combat with environmental-effects',
  KEY
])
const COMBAT=new tablem.Table('Foes').add('Foes',3).add('Foes, loot',3)
const ROOM=new tablem.Table('Room').add('',3).add(COMBAT,2).add(FEATURE)
const ROLL=new Object()

export class Room{
  constructor(description=ROLL){
    if(description==ROLL){
      description=ROOM.roll()
      if(description.length) description+='.'
    }
    this.description=description
  }
}

export class Dungeon{
  constructor(){
    this.name=''
    this.intro=''
    this.outro=''
    this.rooms=[]
    this.map=1//permutation of map to use
    this.tables=Array.create(2,()=>new Array(7).fill(''))
    this.authors=''
    this.challenge=''
  }

  resize(nrooms){
    let rooms=this.rooms
    for(let i of Math.step(rooms.length,nrooms)) rooms.push(new Room())
    while(rooms.length>nrooms) rooms.pop()
  }
}

export function load(data){
  let dungeon=new Dungeon()
  Object.assign(dungeon,data)
  dungeon.rooms=data['rooms'].map((data)=>new Room(data['description']))
  return dungeon
}
