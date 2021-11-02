import { Topic } from "./topic";

export class Week {
  id: number;
  name: string="";
  week : string="";
  days:Topic[][]=[[],[],[],[],[]];
  techs:string[]=[];

  constructor( 
    id: number,
  ) {
    this.id=id;
    
  }
}
