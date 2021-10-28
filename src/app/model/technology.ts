import { Topic } from './topic';
export class Technology {
  id: number;
  name: string;
  color: String;

  constructor( 
    id: number,
    name: string,
    color: String
  ) {
    this.id=id;
    this.name=name;
    this.color=color;
  }
}
