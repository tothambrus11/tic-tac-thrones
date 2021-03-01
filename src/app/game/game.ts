import {MiniBoard} from './miniBoard';
import {Color, Colors} from './colors';
import {Field} from './field';
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

export class Game extends Occupiable{
    readonly miniBoards: MiniBoard[][] = [];
    whoseTurn!: Color;

    constructor(private container: HTMLDivElement) {
      super();

        for (let i = 0; i < 3; i++) {
            this.miniBoards.push([]);
            for (let j = 0; j < 3; j++) {
                const mb = new MiniBoard(this, j, i);
                this.miniBoards[i].push(mb);
                container.append(mb.miniBoardElement);
            }
        }

        this.setTurn(Colors.BLUE);
    }

    setTurn(color: Color): void {
        this.container.classList.remove(color === Colors.BLUE ? 'reds-turn' : 'blues-turn');
        this.container.classList.add(color === Colors.BLUE ? 'blues-turn' : 'reds-turn');
        this.whoseTurn = color;
    }

    onTic(chosenMiniBoard: MiniBoard, choseField: Field): void {
        this.whoseTurn = Colors.not(this.whoseTurn);
        this.setTurn(this.whoseTurn);

        if (this.miniBoards[choseField.y][choseField.x].isFinished) {
            // bármelyikre rakhatunk, ami nem finished
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (!this.miniBoards[i][j].isFinished) {
                        this.miniBoards[i][j].active = true;
                    }
                }
            }
        } else {
            // csak az adott cuccra rakhatunk
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    this.miniBoards[i][j].active = false;
                }
            }
            this.miniBoards[choseField.y][choseField.x].active = true;
        }
    }


  occupy(color: Color) {
    this.occupiedBy = color;
    this.container.innerHTML = '';
    this.container.classList.add('occupied');
    this.container.classList.add(color === Colors.RED ? 'reds' : 'blues');
    let inner = document.createElement('div');
    inner.classList.add('inner');
    this.container.append(inner);
  }
}
