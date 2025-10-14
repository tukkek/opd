const ANCHOR=document.createElement('a')

export class Manager{
  constructor(savequery,loadquery){
    if(savequery) document.querySelector(savequery).onclick=()=>this.save()
    if(loadquery){
      let input=document.querySelector(loadquery)
      input.onchange=()=>this.load()
      this.input=input
    }
  }

  save(object,name){
    let blob=new Blob([JSON.stringify(object,false,2)],{type:'application/json'})
    ANCHOR.href=URL.createObjectURL(blob)
    ANCHOR.download=name
    ANCHOR.click()
  }

  async load(){
    return new Promise((resolve)=>{
      let reader=new FileReader()
      reader.onload=()=>resolve(JSON.parse(reader.result))
      reader.readAsText(this.input.files[0])
    })
  }

  ready(){return}
}
