import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService, Category, Item, Price, Subcategory } from '../admin.service';
import { Observable, Subject, filter, map, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environment/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { provideClientHydration } from '@angular/platform-browser';
import { generateId } from '../../shared/util';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent implements AfterViewInit, OnDestroy,OnInit{
  dataSource: MatTableDataSource<Item> = new MatTableDataSource;

  columns = ['name','description','categoryName','subcategoryName','imagePath','menu'];

  items$ = this.adminService.items$;

  onDestroy$ = new Subject;

  fgItem:FormGroup = this.fb.group({
    id:[''],
    name: ['', Validators.required],
    description: [''],
    categoryId: ['', Validators.required],
    categoryName: ['', Validators.required],
    subcategoryId: [''],
    subcategoryName: [''],
    image: [null, Validators.required]
    
  });

  categories$ = this.adminService.categories$;
  currentDialog:MatDialogRef<any> | null = null;

  @ViewChild('addItem') addItem:any;
  @ViewChild('fileInput') fileInput?: ElementRef; 

  subcategories$:Observable<Subcategory[]> = this.fgItem.controls['categoryId'].valueChanges.pipe(
    withLatestFrom(this.categories$),
    map(([categoryId, categories])=>{
      console.log('subcategories', categoryId, categories.find((cat)=>cat.id === categoryId)?.subcategories || []);
      return categories.find((cat)=>cat.id === categoryId)?.subcategories || []
    })
  )

  selectedFile: any = null;

  apiUrl = environment.apiUrl;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  subcategories:Subcategory[] = [];

  dataSourcePrices: MatTableDataSource<Price> = new MatTableDataSource;
  displayColumnsPrice = ['size','price','menu'];

  constructor(
    private readonly adminService: AdminService,
    private readonly fb: FormBuilder,
    private dialog: MatDialog,
    private readonly snackbar: MatSnackBar
  ){


    
  }

  ngOnInit(): void {
    this.fgItem.controls['categoryId'].valueChanges.pipe(
      takeUntil(this.onDestroy$),
      withLatestFrom(this.categories$),
      tap(([categoryId, categories])=>{
        this.fgItem.patchValue({
          categoryName: categories.find((cat)=>cat.id===categoryId)?.category,
          subcategoryId:'', 
          subcategoryName:''
        });

        this.subcategories= categories.find((cat)=>cat.id === categoryId)?.subcategories || []
      })
    ).subscribe();

    this.fgItem.controls['subcategoryId'].valueChanges.pipe(
      takeUntil(this.onDestroy$),
      withLatestFrom(this.subcategories$),
      tap(([categoryId, subcategories])=>{
        this.fgItem.patchValue({subcategoryName: subcategories.find((cat)=>cat.id===categoryId)?.subcategory});
      })
    ).subscribe();
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.items$.pipe(
        takeUntil(this.onDestroy$),
        tap((items)=>{
          console.log('items', items)
          this.dataSource.data = items;
          this.dataSource.paginator = this.paginator as MatPaginator;
          this.dataSource.sort = this.sort as MatSort;
        })
      ).subscribe();
    },300)
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  openDialog(){
    this.currentDialog = this.dialog.open(this.addItem,{
      disableClose: true,
      width: '40%'
    })

    this.currentDialog.afterClosed().pipe(
      filter(res=>res),
      switchMap((res)=>{

        const fgValue = this.fgItem.value;

        const formData = new FormData();
        formData.append('id', fgValue['id']);
        formData.append('name', fgValue['name']);
        formData.append('description', fgValue['description']);
        formData.append('categoryId', fgValue['categoryId']);
        formData.append('subcategoryId',fgValue['subcategoryId']);
        formData.append('image',fgValue['image']);

       const obs$ = fgValue['id'] ? 
          this.adminService.updateItem(formData) : 
          this.adminService.addItem(formData);

        return obs$;

      }),
      switchMap((res:any)=>{
        const prices =  this.dataSourcePrices.data.filter((price)=>{
          return price.price
        })
        const pricesBody = {
          itemId:res?.id,
          prices: prices
        }
        return this.adminService.addPrices(pricesBody)
      }),
      tap((res)=>{
        this.resetForm();
        this.adminService.getItems();
        this.snackbar.open('Item Saved','',{
          duration:2000,
          verticalPosition: 'top'
        })
      }),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  resetForm(){
    this.fgItem.reset();
    this.fileInput && (this.fileInput.nativeElement.value = null);
    this.selectedFile = null;
  }

  

  onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0] ?? null;
      this.fgItem.patchValue({image: this.selectedFile})
  
  }

  viewImage(path:string){
    const filename = path.split('/').pop();
    window.open(`${this.apiUrl}/images/items/${filename}`, "_blank");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editItem(currentItem:Item){
    const filename = currentItem.imagePath.split('/').pop() || ''
    fetch(`${this.apiUrl}/images/items/${filename}`)
    .then((res) => res.blob())
    .then((myBlob) => {
     
       const myFile = new File([myBlob], filename, {type: myBlob.type});
       this.fgItem.patchValue({
        id:currentItem.id,
        name:currentItem.name,
        description: currentItem.description,
        categoryId: currentItem.categoryId,
        subcategoryId: currentItem.subcategoryId,
        image: myFile
      });

      this.selectedFile = myFile;

      console.log('prices', currentItem.prices);

      this.dataSourcePrices.data = []

      currentItem.prices && (this.dataSourcePrices.data = JSON.parse(JSON.stringify(currentItem.prices)))
  
      this.openDialog();
    });
  }

  removeItem(item:Item){
    this.adminService.removeItem(item.id).pipe(
      takeUntil(this.onDestroy$),
      tap((res)=>{
        this.adminService.getItems();
        this.snackbar.open(`Item ${item.name} is deleted.`,'',{
          duration:2000
        })

      })
    ).subscribe();
  }

  

  addPrice(){
    let prices = [...this.dataSourcePrices.data];
    prices.push({id:generateId(), size:'', price:null});
    this.dataSourcePrices.data = prices;
  }

  removePrice(price:Price){
    let prices = [...this.dataSourcePrices.data];
   let  pricesF = prices.filter((p)=>p.id !== price.id)
    console.log('prices', prices, pricesF)
    this.dataSourcePrices.data = [...pricesF];
  }

  editField(element:Price,field: 'id'|'size'| 'price',event:any){
    element[field] = event.target.value
    console.log('element', element[field])
  }




}
