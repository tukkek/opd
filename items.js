#!/usr/bin/env -S deno
import './libraries/range/range.js'
import './libraries/array/array.js'
import * as rpgm from './libraries/rpg/rpg.js'

const ACCESSORY=[
  ['Bone','Skull','Wand','Scepter','Tome',],
  ['Charm','Pendant','Ring','Amulet',],
  ['Ribbon','Badge','Crest',],
]
const WEAPONS=[
  ['Revolver','Musket','Shotgun','Rifle','Cannon',],
  ['Bow','Cross-bow',],
  ['Knife','Claw','Dagger','Sabre','Claymore'],
  ['Cleaver','Hatchet','Axe','Scythe','Halberd',],
  ['Club','Hammer','Mallet','War-hammer','Maul',]
]
const ARMOR=[
  ['Hat','Circlet','Mask','Cap','Helm',],
  ['Buckler','Shield',],
  ['Robe','Tunic','Cuirass','Chain-mail','Plate-mail'],
  ['Boots','Greaves',],
]
const POWERS=['Aggression','Bleeding','Blight','Breaking','Charge',
  'Colors','Conjuration','Consecration','Corrosion','Dance','Death',
  'Decay','Deceit','Defilement','Demons','Devastation','Domination',
  'Draining','Earth','Elders','Fire','Fortitude','Fury','Glory','Heaven',
  'Heresy','Hunting','Ice','Insulation','Interrogation','Magic','Mania',
  'Menace','Mercy','Might','Mystery','Nature','Negation','Oppression',
  'Order','Peace','Piercing','Plague','Poison','Preservation','Purging',
  'Purity','Rampage','Redemption','Resistance','Resonance','Revenge',
  'Sabotage','Searing','Shelter','Shielding','Sight','Stone','Storms',
  'Tactics','Thunder','Tricks','Tyranny','Venom','Vigor','Void','War',
  'Warding','Warping','Will',]

class Power{
  constructor(name,major){
    this.name=name
    this.major=major
  }

  toString(){return `of ${this.major?'minor':'major'}-${this.name}`}
}

class Item{
  constructor(tier,name){
    this.tier=tier
    this.name=name
    this.power=false
  }

  toString(){
    return [`+${this.tier}`,this.name,this.power].filter()
    .map((object)=>object.toString()).join(' ').toLowerCase()
  }

  clone(){return new Item(this.tier,this.name)}
}

class Category{
  constructor(itemsp){
    let items=[false]
    for(let i of Math.step(0,itemsp.length))
      items.push(new Item(i+1,itemsp[i]))
    this.items=items
  }
}

var categories=[ARMOR,WEAPONS,ACCESSORY].flat().map((array)=>new Category(array))

function pick(tier){
  for(let category of rpgm.shuffle(categories)){
    let item=category.items[tier]
    if(item) return item.clone()
  }
  throw `Could not create tier-${tier} item!`
}

export function create(tier){
  tier=rpgm.bind(1,rpgm.shift(tier),5)
  let power=rpgm.roll()-4
  if(power>0&&tier>power){
    tier-=power
    power=new Power(rpgm.pick(POWERS),tier==2)
  }else power=false
  let item=pick(tier)
  item.power=power
  return item
}

if(import.meta.main) for(let tier of Math.step(1,5+1))
  console.log(tier,create(tier).toString())
