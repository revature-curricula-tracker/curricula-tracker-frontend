import { Topic } from "./topic";

export class Technology {

  techId: number;
  techName: string;
  color: string;
  topics: Topic[];

  constructor( 
    techId: number = -1,
    techName: string = 'none',
    color: string = 'DDDDDD',
    topics: Topic[] = []
  ) {
    this.techId = techId;
    this.techName = techName;
    this.color = color;
    this.topics = topics;
  }
}
