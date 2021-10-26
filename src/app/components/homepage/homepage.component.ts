import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

export interface PeriodicElement {
  name: string;
  weeks: number;
}



const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Java', weeks: 3 },
  { name: 'SQL', weeks: 2 },
  { name: 'Spring Boot', weeks: 1 },
  { name: 'Javascript', weeks: 1 },
];


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  title = "Curricula";
  result = ELEMENT_DATA.length;
  private searchTerms = new Subject<string>();
  constructor() { }

  displayedColumns: string[] = ['name', 'weeks'];
  // dataSource = ELEMENT_DATA;


  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ngOnInit(): void {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }


}
