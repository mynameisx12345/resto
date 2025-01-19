import { AfterViewInit, Component, OnDestroy, ViewChild, viewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService, Category } from '../admin.service';
import { Subject, combineLatest, combineLatestWith, filter, from, map, of, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs';
import { User } from '../../user/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PAGES } from '../../shared/constants/resto.constant';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { accessSync } from 'fs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { pid } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource;
  displayedColumns = ['id','username','name','menu'];

  onDestroy$ = new Subject;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild('addUser') addItem: any;

  currentDialog: MatDialogRef<any> | null = null;

  fgUser: FormGroup = this.fb.group({
    id:[null],
    username: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required],
    pageAccess: [[], Validators.required],
    categoryAccess: [[], Validators.required],
    subcategoryAccess: [[]]
  });

  categories$ = this.adminServie.categories$;
  pages = PAGES;

  selectedPages$ = this.fgUser.controls['pageAccess']
    .valueChanges.pipe(
      //startWith([3]),
      map((access)=>{
        console.log('triggered')
        return access.map((acc:any)=>{
          return {
            id: acc,
            page: this.pages.find((page)=>page.id== acc)?.page
          }
        })
      })
    );

  selectedCategories$ = this.fgUser.controls['categoryAccess'].valueChanges.pipe(
    withLatestFrom(this.categories$),
    map(([selected,categories])=>{
      return selected.map((acc:any)=>{
        return {
          id: acc,
          category:categories.find(cat=>cat.id === acc)?.category
        }
      })
    })
  )

  selectedSubcategories$ = this.fgUser.controls['subcategoryAccess'].valueChanges.pipe(
    withLatestFrom(this.categories$),
    map(([selected,categories])=>{
      let subcategories:any = [];
      categories.forEach((cat:Category)=>{
        subcategories = [...subcategories, ...cat.subcategories]
      })

      return selected.map((acc:any)=>{


        return {
          id: acc,
          subcategory: subcategories.find((sub:any)=>sub.id ===acc)?.subcategory
        }
      })
    })
  )

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  pages$ = this.fgUser.controls['pageAccess'].valueChanges.pipe(
    startWith([]),
    map((access)=>{
      return this.pages.filter((page)=>!access.includes(page.id))
    })
  )

  filteredCategories$ = this.fgUser.controls['categoryAccess'].valueChanges.pipe(
    startWith([]),
    withLatestFrom(this.categories$),
    map(([access,categories])=>{
      return categories.filter(cat=>!access.includes(cat.id))
    })
  )

  filteredSubcategories$ = this.fgUser.controls['subcategoryAccess'].valueChanges.pipe(
    startWith([]),
    combineLatestWith(this.fgUser.controls['categoryAccess'].valueChanges),
    withLatestFrom(this.categories$),
    map(([[access, selectedCategories], categories])=>{
       console.log('acc', access,categories,selectedCategories)
      let subcategories:any = [];
      categories.filter(cat=>selectedCategories.includes(cat.id)).forEach((cat:Category)=>{
        subcategories = [...subcategories, ...cat.subcategories]
      })

      console.log('subcate', subcategories,access)

      return subcategories.filter((sub:any)=> !access.includes(sub.id))

    })
  )
  

  constructor(
    private readonly adminServie: AdminService,
    private readonly dialog: MatDialog,
    private readonly fb: FormBuilder,
    private readonly snackbar: MatSnackBar
  ){

   
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.adminServie.users$.pipe(
        takeUntil(this.onDestroy$),
        tap((users:User[])=>{
          this.dataSource.data = users;
          this.dataSource.paginator = this.paginator as MatPaginator;
          this.dataSource.sort = this.sort as MatSort;
        })
      ).subscribe();
    });

   //this.fgUser.patchValue({pageAccess: [3]})

    this.fgUser.controls['subcategoryAccess'].valueChanges.subscribe(val=>console.log('sub', val))
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editUser(user:User){
    console.log('user', user)
   
    this.openDialog();

    setTimeout(()=>{
      this.fgUser.patchValue(user,{emitEvent:true});
    })
  }

  resetForm(){
    this.fgUser.patchValue({
      id:null,
      name: '',
      username:'',
      password:'',
      pageAccess: [],
      categoryAccess:[],
      subcategoryAccess:[]
    })
  }

  openDialog(){
    this.currentDialog = this.dialog.open(this.addItem,{
      disableClose: true, 
      width: '40%'
    })

    // this.currentDialog.afterClosed().pipe(
    //   takeUntil(this.onDestroy$),
    //   filter(res=>res),
    //   switchMap((res)=>{
    //     return this.adminServie.saveUser(this.fgUser.value)
    //   }),
      
    //   tap((res:any)=>{
    //     if(res?.hasError){
    //       this.snackbar.open('Username is ALREADY USED','',{
    //         duration:2000,
    //         verticalPosition:'top'
    //       })
    //     } else {
    //       this.resetForm();
    //       this.snackbar.open('User Saved', '',{
    //         duration:2000,
    //         verticalPosition:'top'
    //       })
    //       this.adminServie.getUsers()
    //     }
  
    //   }),
    
    // ).subscribe();
  }

  selectPage(event: MatAutocompleteSelectedEvent){
    this.fgUser.patchValue({pageAccess: [...this.fgUser.controls['pageAccess'].value, event.option.value]})
  }

  removePage(id:any){
    const newPages = this.fgUser.controls['pageAccess'].value.filter((access:any)=>access != id);
    this.fgUser.patchValue({pageAccess: newPages })
  }

  selectCategory(event: MatAutocompleteSelectedEvent){
    this.fgUser.patchValue({categoryAccess: [...this.fgUser.controls['categoryAccess'].value, event.option.value]})
    this.categories$.pipe(
      take(1),
      tap((categories)=>{
        const subcategories = categories.find(cat=>cat.id === event.option.value)?.subcategories.map(sub=>sub.id)
        this.fgUser.patchValue({subcategoryAccess: [...this.fgUser.controls['subcategoryAccess'].value, ...subcategories as []]})
      })
    ).subscribe()
  }

  removeCategory(id:any){
    const newCategories = this.fgUser.controls['categoryAccess'].value.filter((access:any)=>access!=id);
    this.fgUser.patchValue({categoryAccess:newCategories})
    this.categories$.pipe(
      take(1),
      tap((categories)=>{
        const subcategories = categories.find(cat=>cat.id === id)?.subcategories.map(sub=>sub.id)
        subcategories?.forEach(sub=>{
          this.removeSubCategory(sub);
        })
      })
    ).subscribe()

    
  }

  selectSubcategory(event:MatAutocompleteSelectedEvent){
    this.fgUser.patchValue({subcategoryAccess: [...this.fgUser.controls['subcategoryAccess'].value, event.option.value]})
  }

  removeSubCategory(id:any){
    const newSubcategories = this.fgUser.controls['subcategoryAccess'].value.filter((access:any)=>access!=id);
    this.fgUser.patchValue({subcategoryAccess: newSubcategories})

    this.categories$.pipe(
      take(1),
      tap((categories)=>{
        const selectedCategory = categories.find(cat=>{
          return cat.subcategories.find(sub=>sub.id === id)
        });

        const selectedSubcategores= selectedCategory?.subcategories.map(sub=>sub.id);
        const hasSubStill = selectedSubcategores?.filter(sub=>{
          return this.fgUser.controls['subcategoryAccess'].value.includes(sub)
        })

        console.log('sel', selectedCategory, selectedSubcategores,hasSubStill)

        if(hasSubStill && hasSubStill?.length === 0){
          this.fgUser.patchValue({categoryAccess: [...this.fgUser.controls['categoryAccess'].value.filter((cat:any)=>cat !==selectedCategory?.id)]})
        }
      })
    ).subscribe()

  }

  removeUser(user:User){
    this.adminServie.removeUser(user).pipe(
      take(1),
      tap(()=>{
        this.snackbar.open('User Removed','',{
          duration:2000,
          verticalPosition:'top'
        })
      })
    ).subscribe()
  }

  saveUser(){
    this.adminServie.saveUser(this.fgUser.value).pipe(
      take(1),
      tap((res:any)=>{
        if(res?.hasError){
          this.snackbar.open('Username is ALREADY USED','',{
            duration:2000,
            verticalPosition:'top'
          })
        } else {
          this.currentDialog?.close();
          this.resetForm();
          this.snackbar.open('User Saved', '',{
            duration:2000,
            verticalPosition:'top'
          })
          this.adminServie.getUsers()
        }
      })
    ).subscribe();
  }


}
