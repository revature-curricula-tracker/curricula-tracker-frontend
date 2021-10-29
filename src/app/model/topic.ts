import { Technology } from './technology';
export class Topic {
  description: string;
  id: number;
  name: string;
  technology: Technology;
  topicDay: number;

  constructor(
    description: string,
    id: number,
    name: string,
    technology: Technology,
    topicDay: number
  ) {
    this.id=id;
    this.name=name;
    this.description=description;
    this.technology=technology;
    this.topicDay=topicDay;
  }
}
