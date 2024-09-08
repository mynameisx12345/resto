import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor() { }

  login(username:string, password:string){
    let findUser= USERS.filter((user)=>user.username===username && user.password === password)
    if(findUser.length > 0){
      this.setCurrentUser(findUser[0])
    }
     return findUser
  }

  setCurrentUser(user:User){
    this.currentUser.next(user);
  }
}

export interface User {
  username: string,
  password: string,
  userType: string
}

const USERS:User[] = [
  {username:'cashier', password: '12345', userType:'cashier'},
  {username:'kitchen', password: '12345', userType:'kitchen'},
  {username:'admin', password: '12345', userType:'admin'}

]