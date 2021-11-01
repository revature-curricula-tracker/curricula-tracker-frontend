import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Curriculum } from 'src/app/model/curriculum';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { CurriculumService } from 'src/app/services/curriculum.service';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private curriculumService: CurriculumService, private route: Router) {

  }
  ngAfterViewInit() {
    this.curriculumService.findAllCurricula().subscribe(data => {
      this.curricula = [...data];
      this.dataSource.sort = this.sort;
      this.dataSource.data = [...this.curricula];
      this.dataSource.paginator = this.paginator;
      console.log(this.curricula);
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
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
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

