import * as mapm from '../view/map.js'

const PARENT=document.querySelector('#text')

export var title=PARENT.querySelector('.title')

export function ready(){
  title.oninput=()=>mapm.create()
}
