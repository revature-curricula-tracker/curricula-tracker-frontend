import { Topic } from "./topic";
export class CurriculumTopicKey{
  curr_id: number;
  topic_id: number;

  constructor( 
    curr_id: number,
    topic_id: number,
  ) {
    this.curr_id=curr_id;
    this.topic_id=topic_id;
  }
}
