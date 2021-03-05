import {Component} from '@angular/core';
import {SwUpdate, UpdateAvailableEvent} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate) {
    swUpdate.checkForUpdate();
    swUpdate.available.subscribe((e: UpdateAvailableEvent)=>{
      swUpdate.activateUpdate().then(() => document.location.reload());
    })
  }
}
