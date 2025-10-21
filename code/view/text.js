import * as tiem from '../../libraries/tie/tie.js'
import * as clientm from '../control/client.js'
import * as resizem from '../view/text-resize.js'

const TEXT=document.querySelector('#text')
const TITLE=TEXT.querySelector('.title')
const AUTHORS=TEXT.querySelector('#authors')
const CHALLENGE=TEXT.querySelector('#challenge')
const INTRO=TEXT.querySelector('.intro')
const OUTRO=TEXT.querySelector('.outro')

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

export function ready(){
  TITLE.oninput=()=>rename()
  AUTHORS.onchange=()=>clientm.dungeon.authors=AUTHORS.value
  CHALLENGE.onchange=()=>clientm.dungeon.challenge=CHALLENGE.value
  for(let textarea of [INTRO,OUTRO]) resizem.resize(textarea)
  INTRO.onchange=()=>clientm.dungeon.intro=INTRO.value
  OUTRO.onchange=()=>clientm.dungeon.outro=OUTRO.value
}

export function draw(){
  let dungeon=clientm.dungeon
  TITLE.value=dungeon.name
  INTRO.value=dungeon.intro
  OUTRO.value=dungeon.outro
  for(let element of Array.from(TEXT.querySelectorAll('li'))) element.remove()
  for(let room of dungeon.rooms) new Room(room).create()
  AUTHORS.value=dungeon.authors
  CHALLENGE.value=dungeon.challenge
}
