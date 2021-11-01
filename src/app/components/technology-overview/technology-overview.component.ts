import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faPencilAlt, faTrash, faPlusSquare, faSearch, faPalette, faSquare, faList } from '@fortawesome/free-solid-svg-icons';
import { ThemePalette } from "@angular/material/core";

// Custom imports
import { TechnologyTopicDialogComponent } from '../technology-topic-dialog/technology-topic-dialog.component';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { TechnologyService } from 'src/app/services/technology.service';
import { Technology } from 'src/app/model/technology';
import { Topic } from '../../model/topic';

@Component({
  selector: 'app-technology-overview',
  templateUrl: './technology-overview.component.html',
  styleUrls: ['./technology-overview.component.css']
})
export class TechnologyOverviewComponent implements AfterViewInit {

  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;
  public panelOpenState = false;

  faSearch = faSearch;
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlusSquare;
  faPalette = faPalette;
  faSquare = faSquare;
  faList = faList;

  techName: string = '';
  technologies: Technology[] = [];
  displayedColumns: string[] = ['techName', 'topics', 'actions'];

  dataSource = new MatTableDataSource<Technology>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog, private techService: TechnologyService) { }

  ngAfterViewInit() {
    this.techService.getAllTechnologies().subscribe(data => {
      this.technologies = [...data];
      this.dataSource.data = [...this.technologies];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.technologies);
    });
  }

  openDialog(type: string, row?: Technology): void {
    let dialogHeight = '350px';
    let dialogWidth = '300px';
    if (type == 'delete') {
      dialogHeight = '250px';
      dialogWidth = '350px';
    }
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
      width: dialogWidth,
      height: dialogHeight,
      data: { 
        techName: this.techName, 
        type,
        row
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.typeDialog == 'create') {
        this.techService.createTechnology(result.row).subscribe((data: Technology) => {
          console.log(`To database --> ${data}`);
          this.technologies.unshift(data);
          this.dataSource.data = [...this.technologies];
        })
        console.log("Created technology" + JSON.stringify(result));
      } else if (result !== undefined && result.typeDialog !== 'create'){
        this.closeTypeDialog(result);
      }
    });
  }

  openDialogTopic(topics: Topic[]): void {
    const dialogRef = this.dialog.open(TechnologyTopicDialogComponent, {
      width: '500px',
      height: '400px',
      data: {
        topics
      }
    })
  }

  closeTypeDialog(closedObj: any) {
    let hasId = ((obj: Technology) => obj.techId == closedObj.row.techId);
    let indexToRemove = this.technologies.findIndex(hasId);

    if (closedObj.typeDialog == 'delete') {
      this.technologies.splice(indexToRemove, 1);
    } else if (closedObj.typeDialog == 'edit') {
      this.technologies.splice(indexToRemove, 1, closedObj.row);
    } else if (closedObj.typeDialog == 'deleteError') {
      
    }
    this.dataSource.data = [...this.technologies];
  }

  // Search method for technologies table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortData(sort: Sort) {
    const data = this.technologies.slice();
    if (!sort.active || sort.direction == '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.techName, b.techName, isAsc);
        case 'topics': return this.compare(+a.topics.length, +b.topics.length, isAsc);
        default: return 0;
      }
    });
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}