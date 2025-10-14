export class Table{
  constructor(name,rows=[]){
    if(!name) throw new Error('Table needs name')
    this.name=name
    this.rows=rows//[object...]
  }

  roll(){
    let row=pick(this.rows)
    return row instanceof Table?row.roll():row
  }

  add(row,count=1){
    count=Math.floor(count)
    for(let i=0;i<count;i++) this.rows.push(row)
    return this
  }

  toString(){return this.roll()}

  get distinct(){return new Set(this.rows)}
}

function pick(array){return array[Math.floor(Math.random()*array.length)]}
