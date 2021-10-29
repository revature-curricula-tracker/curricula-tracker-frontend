import { Topic } from "./topic";

export class Technology {
  id: number;
  techName: string;
  color: string;
  techId: number;
  topics: Topic[];

  constructor(
    id: number,
    techName: string,
    color: string,
    techId: number,
    topics: Topic[]
  ) {
    this.id=id;
    this.techName=techName;
    this.color=color;
    this.techId=techId;
    this.topics=topics
  }
}
