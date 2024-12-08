import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  defaultView = new BehaviorSubject<any>({order:'card', kitchen:'table'});
  defaultView$ = this.defaultView.asObservable();

  kitchenCategory = new BehaviorSubject(['Pizza', 'Pasta','Drinks','Desserts']);
  kitchenCategory$ = this.kitchenCategory.asObservable();
  constructor() { }


}
