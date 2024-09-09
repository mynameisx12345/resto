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
    {
      id: '22',
      img: '../../../assets/images/foods_pizza_paradiso.png',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Pizza Paradiso',
      prices: [{ price: 140, size: '' }],
    },
    {
      id: '23',
      img: '../../../assets/images/foods_pizza_pugliese.png',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Pugliese',
      prices: [{ price: 140, size: '' }],
    },
    {
      id: '24',
      img: '../../../assets/images/foods_pizza_frutti.png',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Frutte De Mare',
      prices: [{ price: 140, size: '' }],
    },
    {
      id: '25',
      img: '../../../assets/images/foods_pizza_jack.png',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Pizza Jack',
      prices: [{ price: 140, size: '' }],
    },
    {
      id: '26',
      img: '../../../assets/images/foods_pizza_ortolana.png',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Pizza',
      name: 'Ortolana',
      prices: [{ price: 140, size: '' }],
    },
    {
      id: '27',
      img: '../../../assets/images/foods_pizza_formaggi.png',
      description: '',
      price: '\u20b1140.00',
      type: 'Foods',
      subType: 'Pizza',
      name: '4 Formaggi',
      prices: [{ price: 140, size: '' }],
    },
    {
      id: '28',
      img: '../../../assets/images/foods_pasta_vongole.png',
      description: '',
      price: '\u20b1130.00',
      type: 'Foods',
      subType: 'Pasta',
      name: 'Spaghetti Alle Vongole',
      prices: [{ price: 130, size: '' }],
    },
    {
      id: '29',
      img: '../../../assets/images/foods_pasta_amore.png',
      description: '',
      price: '\u20b1120.00',
      type: 'Foods',
      subType: 'Pasta',
      name: 'Pasta Amore',
      prices: [{ price: 120, size: '' }],
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
