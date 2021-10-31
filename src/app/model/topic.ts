import { Technology } from './technology';
export class Topic {
  description: string;
  id: number;
  name: string;

  constructor(
    description: string,
    id: number,
    name: string,

  ) {
    this.id=id;
    this.name=name;
    this.description=description;
  }
}
