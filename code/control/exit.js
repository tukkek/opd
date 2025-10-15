const MINUTE=60

export var saved=0

function time(){return Date.now()/1_000}

function close(event){if(time()-saved>MINUTE) event.preventDefault()}

export function ready(){window.addEventListener('beforeunload',close,true)}

export function save(){saved=time()}
