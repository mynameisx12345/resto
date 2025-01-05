export function generateId(){
    return Math.round(Math.random() *100)
  }

export function checkIfMobile(){
    let isMobile = false;
    const ua= navigator.userAgent;

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      isMobile =true;
    }
    return isMobile;
}

export function toCurrency(amount:number){
    return `\u20b1${amount.toFixed()}`
}