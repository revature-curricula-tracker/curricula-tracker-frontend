import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Curriculum } from 'src/app/model/curriculum';
import { ThemePalette } from "@angular/material/core";
import { Observable, ReplaySubject } from 'rxjs';
import { CurriculaService } from 'src/app/services/curricula.service';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


export interface Dessert {
  name: string;
  weeks: number;
}
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements AfterViewInit {

  faPlus = faPlusSquare;

  curriculumName: string = '';
  numWeeks: number = 0;
  curricula: Curriculum[] = [];

  displayedColumns: string[] = ['name', 'weeks'];
  dataSource = new MatTableDataSource<Curriculum>();
  sortedData;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private curriculaService: CurriculaService, private route: Router) {
    this.sortedData = this.curricula.slice();
  }

  ngAfterViewInit() {
    this.curriculaService.getAllCurricula().subscribe(data => {
      this.curricula = [...data];
      console.log(this.curricula);
      this.dataSource.data = [...this.curricula];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortData(sort: Sort) {
    const data = this.curricula.slice();
    if (!sort.active || sort.direction == '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.curriculumName, b.curriculumName, isAsc);
        case 'weeks': return this.compare(+a.numWeeks, +b.numWeeks, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  //Change to CreatePage...
  navigateTo() {
    this.route.navigate(['/curriculum']);
  }
}

