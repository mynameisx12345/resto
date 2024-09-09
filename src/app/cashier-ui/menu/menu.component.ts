import { Component, Input, OnInit } from '@angular/core';
import { MenuListService } from '../menu-list.service';
import { take, tap } from 'rxjs';
import { Orders } from '../menu-list.model';
import { FormBuilder } from '@angular/forms';

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

  products = [
    {
      id: '1',
      img: '../../../assets/images/pizza.jpg',
      description: 'Tomato, Mozzarela, Zola, Bell Pepper',
      price: '\u20b1340.00 - 12in \n\n \u20b1450.00 - 16in',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Pizza Staff',
      prices: [{ price: 340, size: '12in' },{ price: 450, size: '16in' }],
    },
    {
      id: '2',
      img: '../../../assets/images/pizza.jpg',
      description:
        'Tomato, Mozzarela, Mushroom, Salami, Black Olive, Bell Pepper',
      price: '\u20b1420.00 - 16in \n\n \u20b1505.00 - 12in',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Pizza Paradiso',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },

    {
      id: '3',
      img: '../../../assets/images/pizza.jpg',
      description: 'Four Cheese',
      price: '\u20b1420.00 - 16in \n\n \u20b1505.00 - 12in',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Calzone 4 Formaggi',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '4',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Food 4',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '5',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Food 5',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '6',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Food 6',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '7',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Food 7',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '8',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Food 8',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '9',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      subType: '',
      name: 'Four Seasons',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '10',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      subType: '',
      name: 'Mango',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '11',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      subType: '',
      name: 'Pineapple',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '12',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      subType: '',
      name: 'Drinks 12',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '13',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      subType: '',
      name: 'Drinks 13',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '14',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      subType: '',
      name: 'Drinks 14',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '15',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      subType: '',
      name: 'Drinks 15',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '18',
      img: '../../../assets/images/leche.jpg',
      description: '',
      price: '\u20b1140.00',
      type: 'Desserts',
      subType: '',
      name: 'Leche Flan',
      prices: [{ price: 140, size: '' }],

    },
    {
      id: '19',
      img: '../../../assets/images/leche.jpg',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Pizza Ferie',
      prices: [{ price: 140, size: '' }],

    },
    {
      id: '20',
      img: '../../../assets/images/leche.jpg',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Pasta',
      name: 'Pasta 123',
      prices: [{ price: 140, size: '' }],

    },
    {
      id: '21',
      img: '../../../assets/images/leche.jpg',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Others',
      name: 'Others 123',
      prices: [{ price: 140, size: '' }],

    },
  ];
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
