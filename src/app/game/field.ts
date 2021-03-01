import {Occupiable} from './occupiable';
import {MiniBoard} from './miniBoard';
import {Color, Colors} from './colors';
import {Game, winPositions} from './game';

export class Field extends Occupiable {
    fieldElement: HTMLDivElement;

    constructor(public game: Game, public miniBoard: MiniBoard, public x: number, public y: number) {
        super();

        this.fieldElement = document.createElement('div');
        this.fieldElement.classList.add('field');

        let innerElement = document.createElement('div');
        innerElement.classList.add('inner');
        this.fieldElement.append(innerElement);

        this.fieldElement.addEventListener('click', () => {
            this.tryOccupy();
        });
    }

    tryOccupy(){
      if (this.miniBoard.active && !this.occupied) {
        this.occupy(this.game.whoseTurn);
        this.game.onTic(this.miniBoard, this);
        return true;
      }
      return false;
    }

    occupy(color: Color) {
        this.occupiedBy = color;
        this.fieldElement.classList.add('occupied');
        this.fieldElement.classList.add(color == Colors.BLUE ? 'blues' : 'reds');

        for (const wpl of winPositions) {
            let won = true;
            for (const wp of wpl) {
                if (this.miniBoard.fields[wp.y][wp.x].occupiedBy != this.game.whoseTurn) {
                    won = false;
                    break;
                }
            }
            if (won) {
                this.miniBoard.occupy(this.game.whoseTurn);
                break;
            }
        }
    }
}
