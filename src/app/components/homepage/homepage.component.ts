import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Curriculum } from 'src/app/model/curriculum';
import { ThemePalette } from "@angular/material/core";
import { Observable, ReplaySubject } from 'rxjs';
import { CurriculaService } from 'src/app/services/curricula.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements AfterViewInit {

  curriculumName: string ='';
  numWeeks: number = 0;
  curricula: Curriculum[] = [];

  displayedColumns: string[] = ['name','weeks'];
  dataSource = new MatTableDataSource<Curriculum>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private techService: CurriculaService) { }

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
