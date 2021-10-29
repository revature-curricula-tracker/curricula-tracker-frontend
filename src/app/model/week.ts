import { TopicsForCurriculum } from './topicsForCurriculum';
export class Week {
  id: number;
  name: string="";
  week : string="";
  days:TopicsForCurriculum[][]=[[],[],[],[],[]];

  constructor( 
    id: number,
  ) {
    this.id=id;
    
  }
}
