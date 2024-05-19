import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
  ){}

  ngOnInit(): void {
    this.fgLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(){
    this.router.navigate(['/cashier/menu'])
  }
}
