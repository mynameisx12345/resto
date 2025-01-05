import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { AdminService, Category } from '../../admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnDestroy {

  defaultView = new BehaviorSubject<any>({order:'card', kitchen:'table'});
  defaultView$ = this.defaultView.asObservable();

  kitchenCategory = new BehaviorSubject(['Pizza', 'Pasta','Drinks','Desserts']);
  kitchenCategory$ = this.kitchenCategory.asObservable();

  onDestroy$ = new Subject;

  constructor(
    private readonly adminService: AdminService
  ) { 
    this.setKitcheckCategory();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete()
  }

  setKitcheckCategory(){
    this.adminService.categories$.pipe(
     takeUntil(this.onDestroy$),
      tap((categories:Category[])=>{
        let _categories = ['Pizza', 'Pasta','Drinks','Desserts'];
        let _categoriesToExclude = ['Foods'];
        categories.forEach((category)=>{
          if(!_categories.find((cat)=>cat === category.category)){
            _categories.push(category.category)
          }
        })
        
        _categories = _categories.filter((cat)=>!_categoriesToExclude.includes(cat))
        this.kitchenCategory.next(_categories)
      })
    ).subscribe();
  }


}
