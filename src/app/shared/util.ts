export function generateId(){
    return Math.round(Math.random() *100)
  }

export function toCurrency(amount:number){
    return `\u20b1${amount.toFixed()}`
}