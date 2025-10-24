import * as tiem from '../../libraries/tie/tie.js'
import * as clientm from '../control/client.js'
import * as resizem from '../view/text-resize.js'

const VIEW=document.querySelector('#text')
const TITLE=VIEW.querySelector('.title')
const AUTHORS=VIEW.querySelector('#authors')
const CHALLENGE=VIEW.querySelector('#challenge')
const INTRO=VIEW.querySelector('.intro')
const OUTRO=VIEW.querySelector('.outro')

class Room extends tiem.Clone{
  constructor(model){
    super('template#room')
    let element=this.select('textarea')
    this.react(()=>model.description=element.value)
    element.value=model.description
    resizem.resize(element)
  }
}

export function rename(){
  clientm.dungeon.name=TITLE.value
  clientm.create()
}

export function reroll(){
  if(!window.confirm('Create new room-contents?')) return
  for(let room of clientm.dungeon.rooms) room.roll()
  draw()
}

export function blank(){if(window.confirm('Discard contents and start a new dungeon?')) clientm.draft()}

export function ready(){
  TITLE.oninput=()=>rename()
  AUTHORS.onchange=()=>clientm.dungeon.authors=AUTHORS.value
  CHALLENGE.onchange=()=>clientm.dungeon.challenge=CHALLENGE.value
  for(let textarea of [INTRO,OUTRO]) resizem.resize(textarea)
  INTRO.onchange=()=>clientm.dungeon.intro=INTRO.value
  OUTRO.onchange=()=>clientm.dungeon.outro=OUTRO.value
  VIEW.querySelector('#reroll').onclick=()=>reroll()
  VIEW.querySelector('#new').onclick=()=>blank()
}

export function draw(){
  let dungeon=clientm.dungeon
  TITLE.value=dungeon.name
  INTRO.value=dungeon.intro
  OUTRO.value=dungeon.outro
  for(let element of Array.from(VIEW.querySelectorAll('li'))) element.remove()
  for(let room of dungeon.rooms) new Room(room).create()
  AUTHORS.value=dungeon.authors
  CHALLENGE.value=dungeon.challenge
}
