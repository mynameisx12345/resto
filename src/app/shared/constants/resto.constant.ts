import { CottageI, ProductI } from "../models/resto.model";

export const REFRESH_RATE = 10000;

export const COTTAGES:CottageI[] = [
    { id: '1', name: 'Cottage 1', price: 150, qrCode: 'code1' },
    { id: '2', name: 'Cottage 2', price: 200, qrCode: 'code2' },
    { id: '3', name: 'Cottage 3', price: 100, qrCode: 'code3' },
    { id: '7', name: 'Cottage 4', price: 0 , qrCode: 'code6'},
    { id: '8', name: 'Cottage 5', price: 0 , qrCode: 'code6'},
    { id: '9', name: 'Cottage 6', price: 0 , qrCode: 'code6'},
    { id: '10', name: 'Cottage 7', price: 0 , qrCode: 'code6'},
    { id: '11', name: 'Cottage 8', price: 0 , qrCode: 'code6'},
    { id: '12', name: 'Cottage 9', price: 0 , qrCode: 'code6'},
    { id: '13', name: 'Cottage 10', price: 0 , qrCode: 'code6'},
    { id: '4', name: 'Table 1', price: 0, qrCode: 'code4' },
    { id: '5', name: 'Table 2', price: 0, qrCode: 'code5' },
    { id: '6', name: 'Table 3', price: 0 , qrCode: 'code6'},
    { id: '14', name: 'Table 4', price: 0, qrCode: 'code4' },
    { id: '15', name: 'Table 5', price: 0, qrCode: 'code5' },
    { id: '16', name: 'Table 6', price: 0 , qrCode: 'code6'},
    { id: '17', name: 'Table 7', price: 0, qrCode: 'code4' },
    { id: '18', name: 'Table 8', price: 0, qrCode: 'code5' },
    { id: '19', name: 'Table 9', price: 0 , qrCode: 'code6'},
    { id: '20', name: 'Table 10', price: 0, qrCode: 'code4' },
    { id: '21', name: 'Table 11', price: 0, qrCode: 'code5' },
    { id: '22', name: 'Table 12', price: 0 , qrCode: 'code6'},
    { id: '23', name: 'Table 13', price: 0, qrCode: 'code4' },
    { id: '24', name: 'Table 14', price: 0, qrCode: 'code5' },
    { id: '25', name: 'Table 15', price: 0 , qrCode: 'code6'},
    







  ]

export const PRODUCTS:ProductI[] = [
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
]