// no-longer needed after Fire-fox implements textarea{field-sizing:content;}
function update(element){
  let rows=element.value.split('\n').length
  if(rows<1) rows=1
  element.setAttribute('rows',rows)
}

export function resize(element){
  update(element)
  element.addEventListener('input',()=>update(element))
}
