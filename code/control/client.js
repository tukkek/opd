import * as mapm from '../view/map.js'
import * as textm from '../view/text.js'

const MODULES=[mapm,textm]

export function ready(){for(let module of MODULES) module.ready()}
