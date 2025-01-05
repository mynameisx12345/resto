import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService, Category, Subcategory } from '../admin.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource();
  subDataSource = new MatTableDataSource<Subcategory>();
  @ViewChild('edit') editDialog:any;

  selectedCategory:Category | null = null;

  fieldA = new FormControl;
  categoryFld = new FormControl;
  

  categories = this.adminService.categories$;

  displayedColumns = [
    'category',
    'menu'
  ]
  currentDialog?:MatDialogRef<any>;

  subDisplayedColumns = [
    'subcategory',
    'menu'
  ]

  onDestroy = new Subject;

  

  constructor(
    private readonly dialog: MatDialog,
    private readonly adminService: AdminService
  ){
    this.fieldA.valueChanges.pipe(
      tap((field)=>{
        this.selectedCategory && (this.selectedCategory.category = field);
        this.adminService.updateCategory(this.selectedCategory as Category);
      })
    ).subscribe();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.categories.subscribe(categories =>{
        this.dataSource.data = [...categories]
      })
    },200)
    
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  removeCategory(category:Category){
    this.selectedCategory = category;
    this.adminService.removeCategory(this.selectedCategory.id).pipe(takeUntil(this.onDestroy)).subscribe(res=>{
      this.selectedCategory = null;
    });
    
  }

  editCategory(category:Category){
    this.selectedCategory = {...category};
    this.openDialog('edit');
  }

  openDialog(mode: 'add' | 'edit'){
    this.currentDialog = this.dialog.open(this.editDialog,{
      disableClose:true,
      width:'30%',
      maxHeight: '50%'
    });

    this.categoryFld.setValue(this.selectedCategory?.category)
    console.log('subcat', this.selectedCategory?.subcategories)
    this.subDataSource.data = JSON.parse(JSON.stringify(this.selectedCategory?.subcategories || []));

    this.currentDialog.afterClosed().pipe(takeUntil(this.onDestroy)).subscribe((ret)=>{
      if(ret){
       console.log('saved')
        this.selectedCategory = {
          id: mode==='add' ? this.generateId() : this.selectedCategory?.id,
          category: this.categoryFld.value,
          subcategories: [...this.subDataSource.data]
        }
   
        if(mode === 'add'){
          this.adminService.setCategory(this.selectedCategory).pipe(takeUntil(this.onDestroy)).subscribe();
        } else {
          this.adminService.updateCategory(this.selectedCategory).pipe(takeUntil(this.onDestroy)).subscribe();
        }

        this.selectedCategory = null;
        this.categoryFld.setValue('');
        this.subDataSource.data = []
      }
    })
  }

  addCategory(){
    this.selectedCategory = null;
    this.openDialog('add');
  }

  generateId(){
    return Math.round(Math.random() *100)
  }

  addSubCategory(){
    let _subcategories = [...this.subDataSource.data];
    _subcategories.push({id:this.generateId(), subcategory:''});
    this.subDataSource.data = _subcategories;
  }

  removeSubCategory(subCategory: Subcategory){
    let _subcategories = [...this.subDataSource.data];
    
    this.subDataSource.data = _subcategories.filter((sub)=>sub.id !== subCategory.id);
  }

  editSubcategory(element:Subcategory,value:string){
    console.log(value)
    element.subcategory = value;

    console.log('selectedcategory', this.selectedCategory)
    // let currentSubcategory = this.selectedCategory?.subcategories.find((cat)=>element.id === cat.id);
    // currentSubcategory && (currentSubcategory.subcategory = value)
  }

}
