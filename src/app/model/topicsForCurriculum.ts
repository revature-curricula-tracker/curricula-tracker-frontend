import { Topic } from './topic';
import { Curriculum } from './curriculum';
import { CurriculumTopicKey } from './CurriculumTopicKey';
export class TopicsForCurriculum {
  curriculum: Curriculum;
  curriculumTopicKey:CurriculumTopicKey;
  topic: Topic;
  topicDay:number;

  constructor( 
    curriculum: Curriculum,
    curriculumTopicKey:CurriculumTopicKey,
    topic: Topic,
    topicDay: number
  ) {
    this.curriculum=curriculum;
    this.curriculumTopicKey=curriculumTopicKey;
    this.topic=topic;
    this.topicDay=topicDay;
  }
}