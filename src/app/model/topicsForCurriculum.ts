export class TopicsForCurriculum {
  curr_id: number;
  topic_id: number;
  topic_day:number;

  constructor( 
    curr_id: number,
    topic_id: number,
    topic_day: number,
  ) {
    this.curr_id=curr_id;
    this.topic_id=topic_id;
    this.topic_day=topic_day;
  }
}