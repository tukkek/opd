import * as tablem from '../../libraries/table.js'
import * as rpgm from '../../libraries/rpg.js'
// import * as encountersm from '../../libraries/encounters.js'

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
  'Non-player character',
  'Combat with environmental-effects',
  KEY
])
const COMBAT='Combat'
const ROOM=new tablem.Table('Room').add('',3).add(COMBAT,2).add(FEATURE)
const ROLL=new Object()

export class Unit{
  constructor(name,brass,brawl,brain,power){
    this.name=name
    this.brain=brain
    this.brawl=brawl
    this.brass=brass
    this.power=power
  }

  get tier(){return Math.floor((this.brass+this.brawl+this.brain)/3)}

  static load(data){return new Unit(data['name'],data['brass'],data['brawl'],data['brain'],data['power'])}
}

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
    this.tables=Array.create(2,()=>new Array(6).fill(''))
  }

  resize(nrooms){
    let rooms=this.rooms
    for(let i of Math.step(rooms.length,nrooms)) rooms.push(new Room())
    while(rooms.length>nrooms) rooms.pop()
  }

  /*fight(data){
    let nfactions=1
    while(rpgm.chance(2)) nfactions+=1
    let factions=rpgm.shuffle(Object.keys(data)).slice(0,nfactions)
    let tier=window.prompt('Dungeon tier?',3)
    let encounters=new encountersm.Encounters(Array.create(2,()=>tier))
    for(let faction of factions){
      let units=data[faction].map((data)=>Unit.load(data))
      for(let unit of units) encounters.populate(unit.tier,()=>unit.name)
    }
    this.fights=encounters.tabulate(6).reverse()
    console.log(this.fights)
  }*/
}

export function load(data){
  let dungeon=new Dungeon()
  Object.assign(dungeon,data)
  dungeon.rooms=data['rooms'].map((data)=>new Room(data['description']))
  return dungeon
}
