import { Technology } from './technology';
export class Topic {
  id: number;
  name: string;
  tech: Technology;

  constructor( 
    id: number,
    name: string,
    tech: Technology
  ) {
    this.id=id;
    this.name=name;
    this.tech=tech;
  }
}
