import { Technology } from './technology';
export class Topic {
  description: string;
  id: number;
  name: string;
  technology: Technology;

  constructor(
    description: string,
    id: number,
    name: string,
    technology: Technology
  ) {
    this.id=id;
    this.name=name;
    this.description=description;
    this.technology=technology;
  }
}
