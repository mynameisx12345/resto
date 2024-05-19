import { AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListService } from '../menu-list.service';
import { OrderList } from '../menu-list.model';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent implements AfterViewInit{
  orderList = []
  dataSource = new MatTableDataSource;
  displayedColumns = ['cottage','sales'];

  constructor(private readonly menuService: MenuListService){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.menuService.orderList$.pipe(
        tap((orderList: OrderList[])=>{
          let mappedCottage:any = [];
          const paidOrderList: OrderList[] = orderList.filter(order=>order.status==='Paid')
          paidOrderList.forEach(order=>{
            const cottage = (order.cottage.length > 0 && order.cottage[0].name) || 'Take Out';
           
            const findCottage = mappedCottage.find((cot:any)=>cot.cottage ===cottage);
            if(!!findCottage){
              findCottage.sales += order.grandTotal;
            } else {
              mappedCottage.push({cottage, sales: order.grandTotal});
            }
            
          });
          this.dataSource.data = mappedCottage;
        })
      ).subscribe()
      
    }, 0);
  }
}
