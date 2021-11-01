import { Topic } from './topic';
export class Technology {
  techId: number;
  techName: string;
  color: string;
  topics: Topic[];

  constructor( id: number, techName: string, color: string, topics:Topic[]) {
    this.techId=id;
    this.techName=techName;
    this.color=color;
    this.topics=topics;
  }
}
