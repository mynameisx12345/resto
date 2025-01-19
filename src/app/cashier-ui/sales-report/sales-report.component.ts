import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MenuListService } from '../menu-list.service';
import { OrderList } from '../menu-list.model';
import { BehaviorSubject, Subject, combineLatest, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs';
import { toCurrency } from '../../shared/util';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService, Category } from '../../admin/admin.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrl: './sales-report.component.scss'
})
export class SalesReportComponent implements AfterViewInit, OnDestroy{
  orderList = []
  dataSource = new MatTableDataSource;
  @ViewChild(MatSort) sort:any;
  @ViewChild(MatPaginator) paginator:any;
  displayedColumns = ['cottage','sales'];

  onDestroy$ = new Subject;

  constructor(
    private readonly menuService: MenuListService,
    private readonly adminService: AdminService
  ){}

  loadSales$ = new BehaviorSubject(false);

  filters$ = new BehaviorSubject<{by:string, start:Date | null, end: Date | null, categories:any}>({by: 'cottage',start: null, end:null, categories: null});

  columns$ = this.filters$.pipe(
    map((filters)=>{
      let res:any
      if(filters.by==='cottage'){
        res = {area:'Cottage/Table', grandTotal: 'Total Sales'}
      } else if(filters.by==='order'){
        res = {hdrId:'Order #', mode: 'Mode', grandTotal: 'Total', dttmOrder: 'Date/Time Ordered'}
      } else if(filters.by==='item'){
        res = {itemName: 'Item', itemSize: 'Size', categoryName:'Category', subcategoryName:'Subcategory', quantity: 'Qty.', price: 'Price', total:'Total'}
      }

      return res;
    })
  )

  range = new FormGroup({
    type: new FormControl<string | null>('cottage'),
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
    categories: new FormControl<any>(null)
  });

  displayColumns$ = this.columns$.pipe(
    map((col:any)=>{
      return Object.keys(col).map((key:any)=>key)
    })
  );

  columnHeader$ = this.columns$.pipe(
    map((col:any)=>{
      return Object.keys(col).map((key:any)=>({id:key, name: col[key]}))
    })
  )

  categories$ = this.adminService.categories$;

  salesReport$ = this.menuService.getSalesReport().pipe(
    withLatestFrom(this.filters$),
    map(([sales,filters])=>{

      const startFilter = (data:any)=>{
        return data.filter((d:any)=>{
            
          return (!!filters.end ? (moment(filters.end).format('YYYY/MM/DD') >= moment(d.dttmOrder).format('YYYY/MM/DD')) : true) &&
            (!!filters.start  ? (moment(filters.start).format('YYYY/MM/DD') <= moment(d.dttmOrder).format('YYYY/MM/DD')) : true)
        })
      }
      const _sales:any = startFilter(sales);
      console.log('sales', _sales,filters)
      let headerOnly = _sales.map((sale:any)=>{
        return {
          hdrId: sale.hdrId,
          mode: sale.mode,
          area: sale.area,
          areaFee: sale.areaFee,
          subTotal: sale.subTotal,
          grandTotal: sale.grandTotal,
          payMode: sale.payMode,
          hdrStatus: sale.hdrStatus,
          dttmOrder: sale.dttmOrder,
          dttmPay: sale.dttmPay,
          paidAmount: sale.paidAmount
        }
      }).filter((sale:any)=>sale.hdrStatus === 'Paid');

      let detailsOnly = _sales.map((sale:any)=>{
        return {
          itemId: sale.itemId,
          itemName: sale.itemName,
          itemSize: sale.itemSize,
          quantity: sale.quantity,
          price: sale.price,
          total: sale.total,
          categoryName: sale.categoryName,
          hdrStatus: sale.hdrStatus,
          dtlId: sale.dtlId,
          categoryId: sale.categoryId,
          subcategoryId: sale.subcategoryId,
          subcategoryName: sale.subcategoryName
        }
      }).filter((sale:any)=>sale.hdrStatus === 'Paid')

      console.log('detailsonly', detailsOnly)

     
    


      const headersOnlyUnique = Array.from(new Set(headerOnly.map((o:any) => JSON.stringify(o)))).map((str:any) => JSON.parse(str));
      let result:any =[];
      if(filters.by === 'cottage'){
        headersOnlyUnique.forEach((hou)=>{
          const foundHou = result.find((res:any)=>res.area  === (hou.area ? hou.area : 'Take Out'));
          if(foundHou){
            foundHou.grandTotal += Number(hou.grandTotal)
          } else {
            result.push({area: hou.area ? hou.area : 'Take Out', grandTotal: Number(hou.grandTotal)})
          }
        })

        result = result.map((res:any)=>({...res, grandTotal: toCurrency(res.grandTotal)}))
      } else if(filters.by==='order'){
        headersOnlyUnique.forEach((hou)=>{
          result.push({
            ...hou, 
            dttmOrder: moment(hou.dttmOrder).format('MMM DD, YYYY hh:mm A'), 
            grandTotal: toCurrency(Number(hou.grandTotal)),
            mode: hou.mode === 'takeout' ? 'Take Out' : 'Dine In'
          })
        })
      } else if(filters.by==='item'){
        //filter category
        const detailsOnlyFilteredCat = detailsOnly.filter((det:any)=>{
          return ((filters.categories && filters.categories.length > 0) &&
            filters.categories.find((cat:any)=>cat.type==='cat' && cat.value===det.categoryId) &&
            ((!!det.subcategoryId && filters.categories.find((sub:any)=>sub.type==='sub' && sub.value===det.subcategoryId)) || !(!!det.subcategoryId))
          ) || !filters.categories || (filters.categories && filters.categories.length <=0)
        })
        detailsOnlyFilteredCat.forEach((det:any)=>{
          const foundDet = result.find((res:any)=>res.itemId === det.itemId && res.price === det.price);
          if(foundDet){
            foundDet.quantity += Number(det.quantity);
            foundDet.total = (foundDet.total ? Number(foundDet.total) : 0) + Number(det.total);
          } else {
            result.push({...det})
          }
        })

        result = result.map((res:any)=>{
          return {
            ...res,
            price: toCurrency(Number(res.price)), total: toCurrency(Number(res.total))
          }
        })
      }
  
      return result;
    }),
    tap((sales)=>{
      console.log('sales123', sales);
    }));

  salesReportByCottage$ = this.loadSales$.pipe(
    filter(load=>load),
    switchMap((filters)=>{
      return this.salesReport$
    }),
    tap((report)=>{
      console.log('report123', report);
      this.loadSales$.next(false);
    })

  )
  

  ngAfterViewInit(): void {
    setTimeout(() => {
      // this.menuService.orderList$.pipe(
      //   tap((orderList: OrderList[])=>{
      //     let mappedCottage:any = [];
      //     const paidOrderList: OrderList[] = orderList.filter(order=>order.status==='Paid')
      //     paidOrderList.forEach(order=>{
      //       const cottage = order.area || 'Take Out';
           
      //       const findCottage = mappedCottage.find((cot:any)=>cot.cottage ===cottage);
      //       if(!!findCottage){
      //         findCottage.sales += order.grandTotal;
      //       } else {
      //         mappedCottage.push({cottage, sales: order.grandTotal});
      //       }
            
      //     });
      //     console.log('salesrep', mappedCottage,paidOrderList,orderList)
      //     this.dataSource.data = mappedCottage;
      //   })
      // ).subscribe()
      this.salesReportByCottage$.pipe(
        takeUntil(this.onDestroy$),
        tap((orderList:any)=>{
          this.dataSource.data = orderList;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      ).subscribe();
      
    }, 0);

    //this.salesReportByCottage$.subscribe()
    this.loadSales$.next(true);
    this.range.controls.end.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap((endValue)=>{
        this.filters$.next({...this.filters$.value, end:endValue})
        if(endValue){
          this.loadSales$.next(true);
        }
       
      })
    ).subscribe();

    this.range.controls.start.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap((startVal)=>{
        this.filters$.next({...this.filters$.value, start:startVal})
        if(startVal){
          this.loadSales$.next(true);
        }
       
      })
    ).subscribe()

    this.range.controls.type.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap((type)=>{
        this.filters$.next({...this.filters$.value, by:type as string})
        this.loadSales$.next(true)
      })
    ).subscribe()

    this.range.controls.categories.valueChanges.pipe(
      takeUntil(this.onDestroy$),
      tap((selected)=>{
        this.filters$.next({...this.filters$.value, categories:selected})
        this.loadSales$.next(true)
      })
    ).subscribe();
  }

  checkIfParentSelected(category:Category){
    return this.range.controls.categories.value?.find((cat:any)=>cat.type === 'cat' && cat.value === category.id)
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
   
  }


}
