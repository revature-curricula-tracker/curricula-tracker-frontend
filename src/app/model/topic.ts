import { Technology } from './technology';
export class Topic {
  id: number;
  name: string;
  description: string;
  tech: Technology;

  constructor( 
    id: number,
    name: string,
    description: string,
    tech: Technology
  ) {
    this.id=id;
    this.name=name;
    this.description=description;
    this.tech=tech;
  }
}
