import { Curriculum } from 'src/app/model/curriculum';
import { Technology } from './technology';
export class Topic {
  description: string;
  id: number;
  name: string;
  technology?: Technology;
  curriculum?: Curriculum;
  topicDay?: number;

  constructor(
    description: string,
    id: number,
    name: string,
    technology?: Technology,
    curriculum?: Curriculum,
    topicDay?: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.technology = technology;
    this.curriculum = curriculum;
    this.topicDay = topicDay || 1;
  }
}
