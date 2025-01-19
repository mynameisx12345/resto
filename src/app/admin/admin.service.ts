import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environment/environment';
import { generateId } from '../shared/util';
import { User } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiUrl = environment.apiUrl;

  categoriesDefault = [
    {id:'1', category:'Foods', subcategories:[{id:'1',subcategory:'Pizza'}, {id:'2',subcategory:'Pasta'}]},
    {id:'2', category:'Drinks', subcategories:[]},
    {id:'3', category:'Desserts', subcategories:[]}

  ]

  categories = new BehaviorSubject<Category[]>([]);
  categories$ = this.categories.asObservable();

  items = new BehaviorSubject<Item[]>([]);
  items$ = this.items.asObservable();

  users = new BehaviorSubject<User[]>([]);
  users$ = this.users.asObservable();

  constructor(
    private readonly http: HttpClient
  ) { 
    this.getCategories();
    this.getItems();
    this.getUsers();
  }

  setCategory(category: Category){
    return this.addCategory(category).pipe(
      tap((res)=>{
        let _catogries = [...this.categories.value]
        _catogries.push(res as Category);
        this.categories.next(_catogries);
      })
    ) 
    
  }

  removeCategory(id:string | number){
    return this.http.delete(`${this.apiUrl}/items/category/${id}`).pipe(
      tap((res)=>{
        let _catogries =[...this.categories.value];
        this.categories.next(_catogries.filter(category=>category.id !== id));
      })
    )
    
  }

  updateCategory(category:Category){
    return this.updateCategoryHttp(category).pipe(
      tap((res)=>{
        let _categories = [...this.categories.value];
        const currentIndex = _categories.findIndex((cat=>cat.id===category.id));
        _categories[currentIndex]= res as Category;
        this.categories.next(_categories);
      })
    )
   
  }

  getCategories(){
     this.http.get(`${this.apiUrl}/items/categories`).pipe(
      tap((categories)=>{
        this.categories.next(categories as Category[]);
      })
     ).subscribe();
  }

  addCategory(category:Category){
    return this.http.post(`${this.apiUrl}/items/category`,category);
  }

  updateCategoryHttp(category:Category){
    return this.http.put(`${this.apiUrl}/items/category`, category);
  }

  getItems(){
    this.http.get(`${this.apiUrl}/items/all`).pipe(
      tap((items:any)=>{
        const parsed = items.map((item:any)=>{
          return {
            ...item,
            prices: item.prices && (Object.keys(item.prices).map((key)=>({
              id:generateId(),
              size:key,
              price: item.prices[key]
            })))
          }
        })
        this.items.next(parsed as Item[])
      })
    ).subscribe();
  }

  addItem(item:FormData){
    return this.http.post(`${this.apiUrl}/items`,item)
  }

  updateItem(item:FormData){
    return this.http.put(`${this.apiUrl}/items`,item)
  }

  removeItem(id:string){
    return this.http.delete(`${this.apiUrl}/items/${id}`);
  }

  addPrices(prices:any){
    return this.http.post(`${this.apiUrl}/items/price`,prices);
  }

  setUsers(users:User[]){
    this.users.next(users);
  }

  getUsers(){
    return this.http.get(`${this.apiUrl}/users`).pipe(
      tap((users:any)=>{
        this.setUsers(users);
      })
    ).subscribe();
  }

  saveUser(user:User){
    return this.http.post(`${this.apiUrl}/users`,user).pipe(
      tap((res)=>{
        
      })
    )
  }

  removeUser(user:User){
    return this.http.delete(`${this.apiUrl}/users/${user.id}`).pipe(
      tap(()=>{
        this.getUsers();
      })
    )
  }
}

export interface Subcategory{
  id: string | number,
  subcategory: string
}

export interface Category{
  id: any,
  category: string,
  subcategories:Subcategory[]
}

export interface Item{
  id: any,
  name: string,
  description: string,
  categoryId: any,
  subcategoryId:any,
  imagePath: string,
  categoryName?:string,
  subcategoryName?:string,
  image?:any,
  prices:Price[]
}

export interface Price{
  id:any,
  size:string,
  price: number | null
}