import * as tiem from '../../libraries/tie/tie.js'
import * as savem from '../../libraries/save.js'
import * as clientm from '../control/client.js'

class Row extends tiem.Clone{
  constructor(){super('template.row')}
}

class Table extends tiem.Clone{
  constructor(label){
    super('template.table')
    this.select('.label').innerText=label
  }

  create(parent=false){
    super.create(parent)
    for(let i of Math.step(6,0,-1)){
      let row=new Row().create(this.root)
      row.select('.roll').innerText=`${i}.`
    }
    this.react(()=>update())
    return this
  }
}

var tables=['Foes','Loot'].map((text)=>new Table(text).create())

export function draw(){
  for(let i of Math.step(0,tables.length)){
    let table=clientm.dungeon.tables[i]
    let inputs=tables[i].selectall('input')
    for(let j of Math.step(0,table.length)) inputs[j].value=table[j]
  }
}

export function ready(){draw()}

function update(){
  for(let i of Math.step(0,tables.length)){
    let inputs=tables[i].selectall('input')
    for(let j of Math.step(0,inputs.length)) clientm.dungeon.tables[i][j]=inputs[j].value
  }
}
