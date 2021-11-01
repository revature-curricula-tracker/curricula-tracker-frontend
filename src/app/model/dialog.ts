export class DialogData {
    input: string;
    days: number;
    name: string[];
    counter: number;


    constructor(
        input: string,
        days: number,
        name: string[],
        counter: number,
    ) {
        this.input = input;
        this.days = days;
        this.name = name;
        this.counter = counter;
    }
}