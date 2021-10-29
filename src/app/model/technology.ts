import { Topic } from "./topic";

export class Technology {

  techId: number;
  techName: string;
  color: string;

  constructor( 
    techId: number = -1,
    techName: string = 'none',
    color: string = 'DDDDDD',
  ) {
    this.techId = techId;
    this.techName = techName;
    this.color = color;
  }
}
