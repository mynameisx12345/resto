import { Component, Input, OnInit } from '@angular/core';
import { MenuListService } from '../menu-list.service';
import { take, tap } from 'rxjs';
import { Orders } from '../menu-list.model';
import { FormBuilder } from '@angular/forms';
import { PRODUCTS } from '../../shared/constants/resto.constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit{

  constructor(
    private readonly menuService: MenuListService,
    private readonly fb: FormBuilder
  ){}
  

  selectedCategory = '';
  selectedSubCategory = '';
  categories = [
    //{ label: 'Cottages/Tables', icon: 'category' },
    { label: 'Foods', icon: 'dinner_dining' },
    { label: 'Drinks', icon: 'liquor' },
    { label: 'Desserts', icon: 'icecream' },
  ];

  subCategories= [
    { label: 'Pizza', icon: 'dinner_dining', category: 'Food'},
    { label: 'Pasta', icon: 'dinner_dining', category: 'Food'},
    
    
  ]

  products = PRODUCTS;
  orders:Orders[] = [];
  fgMenu:any;
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
  }

  filteredProducts() {
    return this.products.filter(
      (product) => product.type === this.selectedCategory && 
      (this.selectedSubCategory === '' ||(!!this.selectedSubCategory && this.selectedSubCategory === product.subType) ) &&
      (this.fgMenu.get('searchMenu').value === '' || (!!this.fgMenu.get('searchMenu').value && product.name.toUpperCase().includes(this.fgMenu.get('searchMenu').value.toUpperCase())))
    );
  }

  orders$ = this.menuService.orders$;

  addOrder(item:Orders){
   this.menuService.addNewOrders(item);
  }

  changeCategory(category:any){
    this.selectedCategory = category.label; 
    this.selectedSubCategory=''
  }
}
