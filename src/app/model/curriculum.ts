import { faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { Topic } from "./topic";
export class Curriculum {
  id: number;
  name: string;
  num_weeks:number;
  num_days:number;
  topics:Array<Topic>;

  constructor( 
    id: number,
    name: string,
    num_weeks: number,
    num_days: number,
    topics:Array<Topic>
  ) {
    this.id=id;
    this.name=name;
    this.num_weeks=num_weeks;
    this.num_days=num_days;
    this.topics=topics;
  }
}
