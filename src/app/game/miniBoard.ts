import {Color, Colors} from './colors';
import {Occupiable} from './occupiable';
import {Field} from './field';
import {Game, winPositions} from './game';

export class MiniBoard extends Occupiable {
  miniBoardElement: HTMLDivElement;
  fields: Field[][];

  constructor(public game: Game, public x: number, public y: number) {
    super();

    this.miniBoardElement = document.createElement('div');
    this.miniBoardElement.classList.add('area');

    this.fields = [];
    for (let i = 0; i < 3; i++) {
      this.fields.push([]);
      for (let j = 0; j < 3; j++) {
        this.fields[i].push(new Field(game, this, j, i));
        this.miniBoardElement.append(this.fields[i][j].fieldElement);
      }
    }
    this.active = true;
  }

  get active() {
    return this.isActive;
  }

  private isActive: boolean = false;

  set active(value: boolean) {
    this.isActive = value;
    if (value) {
      this.miniBoardElement.classList.add('active');
    } else {
      this.miniBoardElement.classList.remove('active');
    }
  }

  get isFinished() {
    return this.occupied || this.isFull;
  }

  get isFull() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (!this.fields[i][j].occupied) {
          return false;
        }
      }
    }
    return true;
  }

  occupy(color: Color): void {
    this.occupiedBy = color;
    this.miniBoardElement.innerHTML = '';
    this.miniBoardElement.classList.add('occupied');
    this.miniBoardElement.classList.add(color === Colors.RED ? 'reds' : 'blues');
    let inner = document.createElement('div');
    inner.classList.add('inner');
    this.miniBoardElement.append(inner);

    for (const wpl of winPositions) {
      let won = true;
      for (const wp of wpl) {
        if (this.game.miniBoards[wp.y][wp.x].occupiedBy != this.game.whoseTurn) {
          won = false;
          break;
        }
      }
      if (won) {
        this.game.occupy(this.game.whoseTurn);
        break;
      }
    }
  }

}
