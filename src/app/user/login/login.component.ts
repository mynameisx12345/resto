import { Component, OnInit, afterNextRender } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, tap } from 'rxjs';
import { PAGES } from '../../shared/constants/resto.constant';
import { CommonService } from '../../shared/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  pwHide = true;
  fgLogin: any;

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private userSevice: UserService,
    private snackbar: MatSnackBar,
    private readonly commonService: CommonService
  ){
    afterNextRender(()=>{
     const currentUser = this.userSevice.getCurrentUser();
     if(currentUser){
      console.log('currentuser', currentUser)
      switch(currentUser.userType){
        case 'Kitchen' :
          this.router.navigate(['/cashier/kitchen']);
          break;
        default:
          this.router.navigate(['/cashier/menu']);
          break;
      }
     }
    })
  }

  ngOnInit(): void {
    this.fgLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  login(){
    // let currentUser = this.userSevice.login(this.fgLogin.get('username').value,this.fgLogin.get('password').value);
    // if(currentUser.length > 0){
    //   if(currentUser[0].userType === 'Kitchen'){
    //     this.router.navigate(['/cashier/kitchen'])
    //   } else {
    //     this.router.navigate(['/cashier/menu'])
    //   }
      
    // } else {
    //   this.snackbar.open('Invalid Username and Password','',{
    //     duration:2000,
    //     verticalPosition: 'top'
    //   })
    // }

    this.userSevice.login(this.fgLogin.get('username').value,this.fgLogin.get('password').value).pipe(
      take(1),
      tap((user)=>{
        if(user.length){
          this.snackbar.open('Login Successfully','',{
            duration:2000,
            verticalPosition:'top'
          });
          
          const pageAccess = user[0].pageAccess.sort()[0];

          const route = PAGES.find(page=>page.id === pageAccess)?.route
          this.commonService.setKitcheckCategory();
          this.router.navigate([route])
        } else {
          this.snackbar.open('Invalid Username and Password','',{
            duration:2000,
            verticalPosition: 'top'
          })
        }
      })
    ).subscribe()

    
    
  }
}
