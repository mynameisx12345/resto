import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) { 
    
  }

  login(username:string, password:string){
    // let findUser= USERS.filter((user)=>user.username===username && user.password === password)
    // if(findUser.length > 0){
    //   this.setCurrentUser(findUser[0])
    // }
    //  return findUser

     return this.http.post(`${this.apiUrl}/users/login`, {username:username, password:password}).pipe(
      tap((user:any)=>{

        if(user.length>0){
          console.log('user', user[0])
          this.setCurrentUser(user[0])
        }
        
      })
     )
  }

  setCurrentUser(user:User | null){
    this.currentUser.next(user);

    localStorage.setItem('user', JSON.stringify(user))
  }

  getCurrentUser(){
    const parsedUser = localStorage.getItem('user');
    const currentUser: User = parsedUser? JSON.parse(parsedUser) : null;
    if(currentUser){
      this.setCurrentUser(currentUser);
    }

    return currentUser;
  }


}

export interface User {
  id?:any,
  username: string,
  password: string,
  userType?: string,
  name?: string,
  pageAccess?: number[],
  categoryAccess?: number[],
  subcategoryAccess?:number[]
}

const USERS:User[] = [
  {username:'cashier', password: '12345', userType:'Cashier'},
  {username:'kitchen', password: '12345', userType:'Kitchen'},
  {username:'admin', password: '12345', userType:'Administrator'}

]