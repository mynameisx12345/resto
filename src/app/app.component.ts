import { Component, afterNextRender } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resto-mama-ui';
  isMobile = this.deviceService.isMobile();;

  constructor(
    private deviceService: DeviceDetectorService
  ){
   
  }
}
