import { Topic } from './topic';
import { Curriculum } from './curriculum';
export class TopicsForCurriculum {
  curr: Curriculum;
  topic: Topic;
  topic_day:number;

  constructor( 
    curr: Curriculum,
    topic: Topic,
    topic_day: number,
  ) {
    this.curr=curr;
    this.topic=topic;
    this.topic_day=topic_day;
  }
}