import { Topic } from './topic';
import { Curriculum } from './curriculum';
import { CurriculumTopicKey } from './CurriculumTopicKey';
export class TopicsForCurriculum {
  cTK:CurriculumTopicKey;
  curr: Curriculum;
  topic: Topic;
  topic_day:number;

  constructor( 
    cTk:CurriculumTopicKey,
    curr: Curriculum,
    topic: Topic,
    topic_day: number,
  ) {
    this.cTK=cTk;
    this.curr=curr;
    this.topic=topic;
    this.topic_day=topic_day;
  }
}