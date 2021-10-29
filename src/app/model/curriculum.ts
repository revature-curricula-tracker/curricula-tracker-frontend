export class Curriculum {
  curriculumId: number;
  curriculumName: string;
  numWeeks:number;
  numDays:number;

  constructor( 
    curriculumId: number,
    curriculumName: string,
    numWeeks: number,
    numDays: number,
  ) {
    this.curriculumId=curriculumId;
    this.curriculumName=curriculumName;
    this.numWeeks=numWeeks;
    this.numDays=numDays;
  }
}
