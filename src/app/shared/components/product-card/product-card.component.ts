import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() id = '';
  @Input() image: string | null ='../../../../assets/images/placeholder.png';
  @Input() description = '';
  @Input() set prices(data:any){
    this._prices = data;
    data.forEach((price:any, index:any)=>{
      this._price +=`\u20b1${price.price.toFixed(2)} - ${price.size}\n\n`
    })

    this._price =this._price.replace("\n", "<br>")
  }
  @Input() name = '';
  @Output() onAdd:any = new EventEmitter;

  _image = '../../../../assets/images/placeholder.png';

  _price = '';
  _prices:any;


  addItem(price:any, size:string){
    this.onAdd.emit({id: this.id,name:this.name,quantity:1,price:price,size:size});
  }
}
