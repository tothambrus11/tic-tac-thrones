export class Colors {
    public static RED = false;
    public static BLUE = true;

    static not(color: Color) {
        return !color;
    }
}

export type Color = false | true;
