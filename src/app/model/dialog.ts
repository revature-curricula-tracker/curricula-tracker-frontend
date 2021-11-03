export class DialogData {
    input: string;
    days: number;
    name: string[];
    counter: number;
    curriculumId: number;
    weekObj: any[];

    constructor(
        input: string,
        days: number,
        name: string[],
        counter: number,
        curriculumId: number,
        weekObj: any[],
    ) {
        this.input = input;
        this.days = days;
        this.name = name;
        this.counter = counter;
        this.curriculumId = curriculumId;
        this.weekObj = weekObj;
    }
}