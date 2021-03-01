import {AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Game} from './game';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit {
  @ViewChild('cont') container?: ElementRef;

  public game?: Game;

  constructor() {
    console.log('Game loaded');
  }

  ngAfterViewInit(): void {
    this.game = new Game(this.container!.nativeElement);
  }

}
