export class Week {
  id: number;
  name: string="";
  week : string="";
  days:string[][]=[[],[],[],[],[],[]];

  constructor( 
    id: number,
  ) {
    this.id=id;
  }
}
