import {Color} from './colors';

export abstract class Occupiable{
    occupiedBy: Color | null = null;

    abstract occupy(color: Color): void;

    get occupied() {
        return this.occupiedBy !== null;
    }
}
