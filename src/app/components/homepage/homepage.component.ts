import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface PeriodicElement {
  name: string;
  weeks: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Java', weeks: 3 },
  { name: 'SQL', weeks: 2 },
  { name: 'Spring Boot', weeks: 1 },
  { name: 'Javascript', weeks: 1 },
  { name: 'Java', weeks: 3 },
  { name: 'SQL', weeks: 2 },
  { name: 'Spring Boot', weeks: 1 },
  { name: 'Javascript', weeks: 1 },
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

export class HomepageComponent implements AfterViewInit {

  title = "Curricula";
  result = ELEMENT_DATA.length;

  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
