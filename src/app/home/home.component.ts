import {AfterViewInit, Component, ViewEncapsulation} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class HomeComponent implements AfterViewInit {

  isHomePage: boolean;

  constructor(private router: Router) {
    this.isHomePage = router.url == '/';
    router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.isHomePage = e.url == '/';
      }
    });
  }

  ngAfterViewInit() {
    /*let game = new Game(this.cont!.nativeElement);

    let a = false;
    for (let i = 0; i < 40; ) {
      a = !a;
      if(game.miniBoards[Math.floor(Math.random()*3)][Math.floor(Math.random()*3)].fields[Math.floor(Math.random()*3)][Math.floor(Math.random()*3)].tryOccupy()){
        i++;
      }
    }*/
  }

}
