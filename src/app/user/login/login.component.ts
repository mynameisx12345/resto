import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackbar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.fgLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    let currentUser = this.userSevice.login(this.fgLogin.get('username').value,this.fgLogin.get('password').value);
    if(currentUser.length > 0){
      if(currentUser[0].userType === 'Kitchen'){
        this.router.navigate(['/cashier/kitchen'])
      } else {
        this.router.navigate(['/cashier/menu'])
      }
      
    } else {
      this.snackbar.open('Invalid Username and Password','',{
        duration:2000,
        verticalPosition: 'top'
      })
    }
    
  }
}
