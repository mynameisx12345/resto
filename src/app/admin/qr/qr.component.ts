import { Component } from '@angular/core';
import { environment } from '../../../environment/environment'
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrl: './qr.component.scss'
})
export class QrComponent {
 serverIp =` ${environment.uiUrl}/customer/customer-menu`;
}
