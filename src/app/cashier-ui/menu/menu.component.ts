import { Component, Input, OnInit } from '@angular/core';
import { MenuListService } from '../menu-list.service';
import { take, tap } from 'rxjs';
import { Orders } from '../menu-list.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit{

  constructor(private readonly menuService: MenuListService){}
  

  selectedCategory = 'Foods';
  categories = [
    //{ label: 'Cottages/Tables', icon: 'category' },
    { label: 'Foods', icon: 'dinner_dining' },
    { label: 'Drinks', icon: 'liquor' },
    { label: 'Desserts', icon: 'icecream' },
  ];

  products = [
    {
      id: '1',
      img: '../../../assets/images/pizza.jpg',
      description: 'Tomato, Mozzarela, Zola, Bell Pepper',
      price: '\u20b1340.00 - 12in \n\n \u20b1450.00 - 16in',
      type: 'Foods',
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
      name: 'Pizza Paradiso',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },

    {
      id: '3',
      img: '../../../assets/images/pizza.jpg',
      description: 'Four Cheese',
      price: '\u20b1420.00 - 16in \n\n \u20b1505.00 - 12in',
      type: 'Foods',
      name: 'Calzone 4 Formaggi',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '4',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      name: 'Food 4',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '5',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      name: 'Food 5',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '6',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      name: 'Food 6',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '7',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      name: 'Food 7',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '8',
      img: '../../../assets/images/pizza.jpg',
      description: '',
      price: '',
      type: 'Foods',
      name: 'Food 8',
      prices: [{ price: 420, size: '12in' },{ price: 505, size: '16in' }],

    },
    {
      id: '9',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      name: 'Four Seasons',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '10',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      name: 'Mango',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '11',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      name: 'Pineapple',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '12',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      name: 'Drinks 12',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '13',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      name: 'Drinks 13',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '14',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      name: 'Drinks 14',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '15',
      img: '../../../assets/images/juice.jpg',
      description: '',
      price: '\u20b140.00',
      type: 'Drinks',
      name: 'Drinks 15',
      prices: [{ price: 40, size: '' }],

    },
    {
      id: '18',
      img: '../../../assets/images/leche.jpg',
      description: '',
      price: '\u20b1140.00',
      type: 'Desserts',
      name: 'Leche Flan',
      prices: [{ price: 140, size: '' }],

    },
  ];
  orders:Orders[] = [];
  ngOnInit(): void {
    this.orders$.pipe(
      take(1),
      tap((orders:Orders[])=>{
        this.orders = orders;
      })
    ).subscribe();
  }

  filteredProducts() {
    return this.products.filter(
      (product) => product.type === this.selectedCategory
    );
  }

  orders$ = this.menuService.orders$;

  addOrder(item:Orders){
   this.menuService.addNewOrders(item);
  }
}
