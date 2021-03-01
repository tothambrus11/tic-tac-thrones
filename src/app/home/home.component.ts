import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Game} from '../game/game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor() { }

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
