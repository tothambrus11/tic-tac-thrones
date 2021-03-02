import {AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Game} from './game';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {

  public game: Game;

  constructor() {
    this.game = new Game();
  }

}
