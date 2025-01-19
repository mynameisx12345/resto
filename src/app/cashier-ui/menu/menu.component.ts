import { Component, Input, OnInit } from '@angular/core';
import { MenuListService } from '../menu-list.service';
import { map, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs';
import { Orders } from '../menu-list.model';
import { FormBuilder } from '@angular/forms';
import { PRODUCTS } from '../../shared/constants/resto.constant';
import { AdminService, Category, Item } from '../../admin/admin.service';
import { environment } from '../../../environment/environment';
import { User, UserService } from '../../user/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit{

  constructor(
    private readonly menuService: MenuListService,
    private readonly fb: FormBuilder,
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ){}

  currentUser$ = this.userService.currentUser$;
  currentUser?:User

  selectedCategory = '';
  selectedSubCategory = '';
  categories = [
    //{ label: 'Cottages/Tables', icon: 'category' },
    { label: 'Foods', icon: 'dinner_dining' },
    { label: 'Drinks', icon: 'liquor' },
    { label: 'Desserts', icon: 'icecream' },
  ];

  icon = {
    'Foods': 'dinner_dining',
    'Drinks': 'liquor',
    'Desserts': 'icecream'
  }

  categories$ = this.adminService.categories$.pipe(
    withLatestFrom(this.currentUser$),
    map(([categories, currentUser])=>{
      return categories.filter(cat=>currentUser?.categoryAccess?.includes(cat.id))
    })
  );

  subCategories= [
    { label: 'Pizza', icon: 'dinner_dining', category: 'Food'},
    { label: 'Pasta', icon: 'dinner_dining', category: 'Food'},
    
    
  ]

  products = PRODUCTS;
  items$= this.adminService.items$;
  items:Item[]=[]
  orders:Orders[] = [];
  fgMenu:any;
  apiUrl = environment.apiUrl;

  ngOnInit(): void {
    this.fgMenu = this.fb.group({
      searchMenu: ['']
    })
    this.orders$.pipe(
      take(1),
      tap((orders:Orders[])=>{
        this.orders = orders;
      })
    ).subscribe();

    this.items$.pipe(
      tap((items:Item[])=>{
        this.items=items;
      })
    ).subscribe();

    this.currentUser$.pipe(
      tap((user)=>{
        this.currentUser = user as User;
      })
    ).subscribe();
  }

  filteredProducts() {
    return this.items.filter(
      (product) => product.categoryName === this.selectedCategory && 
      (this.currentUser?.subcategoryAccess?.includes(product.subcategoryId) && 
        ( this.selectedSubCategory === '' ||
          (!!this.selectedSubCategory && this.selectedSubCategory === product.subcategoryName) )) &&
      (this.fgMenu.get('searchMenu').value === '' || (!!this.fgMenu.get('searchMenu').value && product.name.toUpperCase().includes(this.fgMenu.get('searchMenu').value.toUpperCase())))
    ).map((product)=>{
      const separator =  product.imagePath.charAt(7);
      return {
        ...product,
        imageLink: `${this.apiUrl}/images/items/${product.imagePath.split(separator).pop()}`
      }
    })
  }

  orders$ = this.menuService.orders$;

  addOrder(item:Orders){
    console.log('items', item)
   this.menuService.addNewOrders(item);
  }

  changeCategory(category:Category){
    this.selectedCategory = category.category; 
    this.selectedSubCategory=''
    this.fgMenu.patchValue({searchMenu:''})
  }

  filterSubcategory(subcategories:any){
    return subcategories.filter((sub:any)=> this.currentUser?.subcategoryAccess?.includes(sub.id))
  }
}
