import * as tiem from '../../libraries/tie/tie.js'
import * as rpgm from '../../libraries/rpg.js'
import * as clientm from '../control/client.js'

class Row extends tiem.Clone{
  constructor(){super('template.row')}
}

class Table extends tiem.Clone{
  constructor(label,rolls){
    super('template.table')
    this.rolls=rolls
    this.select('.label').innerText=label
  }

  create(parent=false){
    super.create(parent)
    for(let i of Math.step(6,0,-1)){
      let row=new Row().create(this.select('table'))
      row.select('.roll').innerText=`${i}.`
    }
    this.react(()=>update())
    let buttons=this.selectall('.rolls button')
    let inputs=Array.from(this.selectall('input')).reverse()
    buttons[0].onclick=()=>window.alert(inputs[rpgm.low(0,inputs.length)].value)
    buttons[1].onclick=()=>window.alert(inputs[rpgm.roll(0,inputs.length)].value)
    buttons[2].onclick=()=>window.alert(inputs[rpgm.high(0,inputs.length)].value)
    return this
  }

  fill(texts){
    let inputs=this.selectall('input')
    for(let i of Math.step(0,texts.length)) inputs[i].value=texts[i]||this.rolls[i]
  }
}

export var foes=[
  'External',
  'Harder',
  'Hard',
  'Fair',
  'Easy',
  'Easier',
]
export var loot=[
  'Lore',
  'Lore',
  'Good gear',
  'Fair gear',
  'Poor gear',
  'Resources',
]

var tables=[new Table('Foes',foes),new Table('Loot',loot)]

export function draw(){
  for(let i of Math.step(0,tables.length))
    tables[i].fill(clientm.dungeon.tables[i])
}

export function ready(){
  for(let table of tables) table.create()
  draw()
}

function update(){
  for(let i of Math.step(0,tables.length)){
    let inputs=tables[i].selectall('input')
    for(let j of Math.step(0,inputs.length)) clientm.dungeon.tables[i][j]=inputs[j].value
  }
}
