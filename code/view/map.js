import * as rotm from "../../libraries/rot/lib/index.js"
import * as textm from '../view/text.js'

const PARENT=document.querySelector('#map')

var version=1

export function hash(text){//https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
  let h = 0, l = text.length, i = 0
  if ( l > 0 ) while (i < l) h = (h << 5) - h + text.charCodeAt(i++) | 0
  return h
}

export function create(){
  let seed=`${textm.title.value}#${version}`
  rotm.RNG.setSeed(Math.abs(hash(seed)))
  let previous=document.querySelector('#map canvas')
  if(previous) previous.remove()
  let cellsize=6
  let size=[1000,700].map((number)=>Math.floor(number/(2*cellsize)))
  let width=size[0]*2
  let height=size[1]
  let map=new rotm.Map.Uniform(width,height,
    {roomWidth:[20,30],roomHeight:[10,20],roomDugPercentage:.3})
  let display=new rotm.Display({width:width, height:height, fontSize:cellsize});
  let element=display.getContainer()
  document.querySelector('#map').appendChild(element)
  map.create(display.DEBUG)
}

export function retry(delta){
  version+=delta
  if(version<1) version=1
  create()
}

export function ready(){
  create()
  PARENT.querySelector('.decrement').onclick=()=>retry(-1)
  PARENT.querySelector('.increment').onclick=()=>retry(+1)
}
