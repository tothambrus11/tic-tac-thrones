import {AfterViewInit, Component, ElementRef, HostListener, ViewChild, ViewEncapsulation} from '@angular/core';
import {Game} from './game';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {

  public game: Game;
  show = false;

  constructor() {
    this.game = new Game();

    let h = localStorage.getItem('history');
    if (h) {
      this.game.initFromHistory(h);
    }

    this.show = true;
  }

  @HostListener('document:keydown.control.z')
  undo(){
    this.game.undo();
  }


}
