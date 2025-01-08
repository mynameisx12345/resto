import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment'
import { COTTAGES } from '../../shared/constants/resto.constant';
import { FormControl } from '@angular/forms';
import { tap,map, startWith } from 'rxjs';
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.scss'
})
export class QrComponent implements OnInit {
  cottageFc = new FormControl('');
 serverIp =` ${environment.uiUrl}/customer/customer-home`;

 url = '';


 url$ = this.cottageFc.valueChanges.pipe(
  startWith(''),
  map((cotVal)=>{
    console.log('url123', cotVal)
    return `${this.serverIp}?id=${cotVal}`
  })
 )


  cottages = COTTAGES;

  ngOnInit(): void {
    this.url$.subscribe((cotVal)=>{
      this.url = cotVal
    })
  }

  
}
