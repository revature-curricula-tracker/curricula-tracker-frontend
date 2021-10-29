import { Topic } from "./topic";

export class Curriculum {
  curriculumId: number;
  curriculumName: string;
  numWeeks:number;
  numDays:number;
  topics: Topic[];

  constructor( 
    curriculumId: number,
    curriculumName: string,
    numWeeks: number,
    numDays: number,
    topics: Topic[],
  ) {
    this.curriculumId=curriculumId;
    this.curriculumName=curriculumName;
    this.numWeeks=numWeeks;
    this.numDays=numDays;
    this.topics=topics
  }
}
