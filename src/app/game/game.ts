import {Color, Colors} from './colors';
import {Occupiable} from './occupiable';

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

export class MiniBoard extends Occupiable {
  //fields: Field[][];

  active: boolean = true;

  constructor(public game: Game, public x: number, public y: number) {
    super(game);

    this.children = [];
    for (let i = 0; i < 3; i++) {
      this.children.push([]);
      for (let j = 0; j < 3; j++) {
        this.children[i].push(new Field(game, this, j, i));
      }
    }
  }

  get fields(){
    return this.children as Field[][];
  }

}

export class Field extends Occupiable {

  constructor(public game: Game, public miniBoard: MiniBoard, public x: number, public y: number) {
    super(miniBoard);
  }

  tryOccupy() {
    if (this.miniBoard.active && !this.occupied) {
      this.occupy(this.game.whoseTurn);
      this.game.onTic(this.miniBoard, this);
      return true;
    }
    return false;
  }

}

export class Game extends Occupiable {
  whoseTurn: Color = Colors.BLUE;

  constructor() {
    super();

    this.children = [];
    for (let i = 0; i < 3; i++) {
      this.children.push([]);
      for (let j = 0; j < 3; j++) {
        this.children[i].push(new MiniBoard(this, j, i));
      }
    }
  }

  onTic(chosenMiniBoard: MiniBoard, choseField: Field): void {
    this.whoseTurn = !this.whoseTurn;

    if (this.children![choseField.y][choseField.x].isFinished) {
      // bármelyik miniboardra rakhatunk, ami nem finished
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (!this.children![i][j].isFinished) {
            (this.children![i][j] as MiniBoard).active = true;
          }
        }
      }
    } else {
      // csak az adott miniboardra rakhatunk
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          (this.children![i][j] as MiniBoard).active = false;
        }
      }
      (this.children![choseField.y][choseField.x] as MiniBoard).active = true;
    }
  }

  get miniBoards(){
    return this.children as MiniBoard[][];
  }

}
