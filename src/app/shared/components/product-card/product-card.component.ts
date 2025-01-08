import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {

  @ViewChild('size') size:any;
  @Input() id = '';
  @Input() image: string | null ='../../../../assets/images/placeholder.png';
  @Input() description = '';
  @Input() set prices(data:any){
    this._prices = data;
    data.forEach((price:any, index:any)=>{
      this._price +=`\u20b1${price.price.toFixed(2)} ${(price.size.length > 0) ? '-' : ''} ${price.size} ${index !== data.length - 1 ? '/  ': ''}`
    })

    this._price =this._price.replace("\n", "<br>")
  }
  @Input() name = '';
  @Output() onAdd:any = new EventEmitter;

  _image = '../../../../assets/images/placeholder.png';

  _price = '';
  _prices:any;



  addItem(price:any, size:string){
   // this.onAdd.emit({id: this.id,name:this.name,quantity:1,price:price,size:size});
    this.onAdd.emit({
      itemId: this.id,
      itemName:this.name,
      quantity:1,
      price:price,
      itemSize:size
    });
    this.snackbar.open(`${this.name} is added to order`,'',{
      duration:3000,
      verticalPosition: 'top'
    })
  }

  currentDialog?:MatDialogRef<any>;
  constructor(
    private readonly dialog: MatDialog,
    private readonly snackbar: MatSnackBar,
    private readonly domSanitizer: DomSanitizer
  ){}

  openDialog(){
    this.currentDialog = this.dialog.open(this.size,{
  
    })

    this.currentDialog.afterClosed().subscribe((res)=>{
      if(res){
        this.addItem(res.price,res.size)
      }
    })
  }

  get sanitizedImage(){
    return this.domSanitizer.bypassSecurityTrustUrl(this.image as string);
  }
}
