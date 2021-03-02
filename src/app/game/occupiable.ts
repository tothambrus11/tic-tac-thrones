import {Color} from './colors';
import {winPositions} from './game';

export abstract class Occupiable {
  occupiedBy: Color | null = null;
  children?: Occupiable[][];

  constructor(private parent?: Occupiable) {
  }

  occupy(color: Color) {
    this.occupiedBy = color;

    if(this.parent){
      for (const wpl of winPositions) {
        let won = true;
        for (const wp of wpl) {
          if (this.parent.children![wp.y][wp.x].occupiedBy != color) {
            won = false;
            break;
          }
        }
        if (won) {
          this.parent.occupy(color);
          break;
        }
      }
    }
  }

  get occupied() {
    return this.occupiedBy !== null;
  }

  get isFinished() {
    return this.occupied || this.isFull;
  }

  get isFull() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.children![i][j].occupied) {
          return false;
        }
      }
    }
    return true;
  }
}
