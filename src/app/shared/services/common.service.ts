import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, map, takeUntil, tap, withLatestFrom } from 'rxjs';
import { AdminService, Category } from '../../admin/admin.service';
import { UserService } from '../../user/user.service';

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
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ) { 
    this.setKitcheckCategory();

  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete()
  }

  setKitcheckCategory(){
    // this.adminService.categories$.pipe(
    //  takeUntil(this.onDestroy$),
    //   tap((categories:Category[])=>{
    //     let _categories = ['Pizza', 'Pasta','Drinks','Desserts'];
    //     let _categoriesToExclude = ['Foods'];
    //     categories.forEach((category)=>{
    //       if(!_categories.find((cat)=>cat === category.category)){
    //         _categories.push(category.category)
    //       }
    //     })
        
    //     _categories = _categories.filter((cat)=>!_categoriesToExclude.includes(cat))
    //     this.kitchenCategory.next(_categories)
    //   })
    // ).subscribe();

    this.adminService.categories$.pipe(
      takeUntil(this.onDestroy$),
      withLatestFrom(this.userService.currentUser$),
      tap(([categories, user])=>{
        console.log('teng1', categories,user)
        let _categories:any = []
        const pizza = categories.find(cat=>{
          return cat.subcategories.find(sub=>sub.subcategory === 'Pizza')
        })?.subcategories.find(sub=>sub.subcategory ==='Pizza');

        if(user?.subcategoryAccess?.includes(pizza?.id as number)){
          _categories.push('Pizza')
        }
      
        const pasta = categories.find(cat=>{
          return cat.subcategories.find(sub=>sub.subcategory === 'Pasta')
        })?.subcategories.find(sub=>sub.subcategory ==='Pasta');

        if(user?.subcategoryAccess?.includes(pasta?.id as number)){
          _categories.push('Pasta')
        }
        
        const drinks = categories.find(cat =>{
          return cat.category === 'Drinks'
        })

        if(user?.categoryAccess?.includes(drinks?.id as number)){
          _categories.push('Drinks')
        }

        console.log('teng2',_categories,'drinks', drinks,'user', user?.subcategoryAccess)

        const desserts = categories.find(cat =>{
          return cat.category === 'Desserts'
        })

        if(user?.categoryAccess?.includes(desserts?.id as number)){
          _categories.push('Desserts')
        }

        let _categoriesToExclude = ['Foods'];
        categories.filter(cat=> user?.categoryAccess?.includes(cat.id)).forEach((category)=>{
          if(!_categories.find((cat:any)=>cat === category.category)){
            _categories.push(category.category)
          }
        })
        
        _categories = _categories.filter((cat:any)=>!_categoriesToExclude.includes(cat))

        console.log('categories123', _categories)
        this.kitchenCategory.next(_categories)


      })
    ).subscribe()
  }


}
