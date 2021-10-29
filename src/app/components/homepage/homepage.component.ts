import { CurriculaService } from 'src/app/services/curricula.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Curriculum } from 'src/app/model/curriculum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

  title = "Curricula";
  ELEMENT_DATA: Curriculum[] = [];
  result = this.ELEMENT_DATA.length;
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(private curriculumService: CurriculaService, private router: Router) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.findAllCurricula();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAllCurricula(): void {
    let counter: number = 0;
    this.curriculumService.getAllCurriculum().subscribe(
      res => {
        res.forEach(x => {
          this.ELEMENT_DATA[counter] = {
            curriculumId: x.curriculumId,
            curriculumName: x.curriculumName,
            numWeeks: x.numWeeks,
            numDays: x.numDays,
            topics: x.topics
          };
          counter++;
        });
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  viewCurriculum(id: number) {
    this.router.navigateByUrl(`curriculum/${id}`);
  }
}
