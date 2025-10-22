import * as rotm from "../../libraries/rot/lib/index.js"
import * as pointm from '../../libraries/point.js'
import * as clientm from '../control/client.js'

const PARENT=document.querySelector('#map')

export var rooms=[]

export function hash(text){//https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
  let h = 0, l = text.length, i = 0
  if ( l > 0 ) while (i < l) h = (h << 5) - h + text.charCodeAt(i++) | 0
  return h
}

function walk(rooms){
  rooms=Array.from(rooms)
  let centers=new Map()
  for(let room of rooms){
    let center=[room.getLeft()+room.getRight(),room.getTop()+room.getBottom()].map((number)=>Math.floor(number/2))
    centers.set(room,new pointm.Point(center[0],center[1]))
  }
  let walked=[rooms.shift()]
  while(rooms.length){
    let center=centers.get(walked.last)
    rooms.sort((room1,room2)=>centers.get(room1).distance(center)-centers.get(room2).distance(center))
    walked.push(rooms.shift())
  }
  return walked
}

export function draw(){
  let dungeon=clientm.dungeon
  let seed=`${dungeon.name}#${dungeon.map}`
  rotm.RNG.setSeed(Math.abs(hash(seed)))
  let previous=document.querySelector('#map canvas')
  if(previous) previous.remove()
  let cellsize=10
  let size=[1000,700].map((number)=>Math.floor(number/cellsize))
  let width=size[0]
  let height=size[1]/2
  let map=new rotm.Map.Uniform(width,height,
    {roomWidth:[10,20],roomHeight:[5,20],roomDugPercentage:.3})
  let display=new rotm.Display({width:width, height:height, fontSize:cellsize});
  let element=display.getContainer()
  document.querySelector('#map').appendChild(element)
  map.create(display.DEBUG)
  rooms=walk(map.getRooms())
  for(let i of Math.step(0,rooms.length)){
    let room=rooms[i]
    let xy=[room.getRight()+room.getLeft(),room.getTop()+room.getBottom()].map((number)=>Math.floor(number/2))
    display.draw(xy[0],+xy[1],i+1,'#ffffff')
  }
}

export function retry(delta){
  let dungeon=clientm.dungeon
  let version=dungeon.map
  version+=delta
  dungeon.map=version>=1?version:1
  clientm.create()
}

export function ready(){
  PARENT.querySelector('.decrement').onclick=()=>retry(-1)
  PARENT.querySelector('.increment').onclick=()=>retry(+1)
}
