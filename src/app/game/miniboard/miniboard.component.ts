import {Component, Input, OnInit} from '@angular/core';
import {MiniBoard} from '../game';

@Component({
  selector: 'miniboard',
  templateUrl: './miniboard.component.html',
  styleUrls: ['./miniboard.component.scss']
})
export class MiniboardComponent implements OnInit {

  @Input()
  miniBoard!: MiniBoard;

  constructor() { }

  ngOnInit(): void {
  }

}
