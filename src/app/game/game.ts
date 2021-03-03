import {Color, Colors} from './colors';
import {Occupiable} from './occupiable';

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

  get fields() {
    return this.children as Field[][];
  }

}

export class Field extends Occupiable {

  constructor(public game: Game, public miniBoard: MiniBoard, public x: number, public y: number) {
    super(miniBoard);
  }

  tryOccupy() {
    if (this.miniBoard.active && !this.occupied) {
      this.occupyNoCheck();
      this.game.history += this.miniBoard.x + '' + this.miniBoard.y + '' + this.x + '' + this.y;
      this.game.saveHistory();
      return true;
    }
    return false;
  }

  occupyNoCheck() {
    this.occupy(this.game.whoseTurn);
    this.game.activateMiniboards(this.x, this.y);
  }

}

export class Game extends Occupiable {
  whoseTurn: Color = Colors.BLUE;
  history: string = '';

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

  activateMiniboards(chosenX: number, chosenY: number): void {
    this.whoseTurn = !this.whoseTurn;

    if (this.children![chosenY][chosenX].isFinished) {
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
      (this.children![chosenY][chosenX] as MiniBoard).active = true;
    }
  }

  get miniBoards() {
    return this.children as MiniBoard[][];
  }

  initFromHistory(h: string) {
    let mx, my, fx, fy;
    for (let i = 0; i < h.length;) {
      mx = Number(h.charAt(i++));
      my = Number(h.charAt(i++));
      fx = Number(h.charAt(i++));
      fy = Number(h.charAt(i++));
      this.miniBoards[my][mx].fields[fy][fx].occupyNoCheck();
    }
    this.history = h;
  }

  saveHistory() {
    localStorage.setItem("history", this.history);
  }

  undo(){
    if(this.history.length>0){
      let h = this.history;
      const mx = Number(h.charAt(h.length - 4));
      const my = Number(h.charAt(h.length - 3));
      const fx = Number(h.charAt(h.length - 2));
      const fy = Number(h.charAt(h.length - 1));
      this.miniBoards[my][mx].fields[fy][fx].unoccupy();

      h = h.substr(0, h.length - 4);

      if(h.length > 0){
        const pfx = Number(h.charAt(h.length - 2));
        const pfy = Number(h.charAt(h.length - 1));
        this.activateMiniboards(pfx, pfy);
      } else {
        for (const row of this.miniBoards) {
          for (const miniBoard of row) {
            miniBoard.active = true;
          }
        }
      }
      this.history = h;
      this.saveHistory();

    }
  }
}
