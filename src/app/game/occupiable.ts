import {Color} from './colors';

export interface Pos {
  x: number;
  y: number;
}

export const winPositions: Pos[][] = [
  [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}],
  [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}],
  [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
  [{y: 0, x: 0}, {y: 0, x: 1}, {y: 0, x: 2}],
  [{y: 1, x: 0}, {y: 1, x: 1}, {y: 1, x: 2}],
  [{y: 2, x: 0}, {y: 2, x: 1}, {y: 2, x: 2}],
  [{x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}],
  [{x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0}]
];

export abstract class Occupiable {
  occupiedBy: Color | null = null;
  children?: Occupiable[][];

  protected constructor(private parent?: Occupiable) {
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

  unoccupy(){
    this.occupiedBy = null;
    if(this.parent){
      this.parent.unoccupy();
    }
  }

  get occupied() {
    return this.occupiedBy !== null;
  }

  get isFinished() {
    if(this.occupied) return true;
    if(this.children){
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!this.children[i][j].isFinished) { // If any of the children is not finished
            return false;
          }
        }
      }
      return true; // none of the children were occupied
    } else {
      return false // not occupied field (no children)
    }
  }


}
