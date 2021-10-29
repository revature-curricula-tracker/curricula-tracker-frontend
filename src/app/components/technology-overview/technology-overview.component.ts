import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { Technology } from 'src/app/model/technology';
import { faPencilAlt, faTrash, faPlusSquare, faSearch} from '@fortawesome/free-solid-svg-icons';

const testTech: Technology[] = [{id: 1, techName: 'Java1', color: "#fff"},
{id: 2, techName: 'AWS2', color: "#fff"},
{id: 3, techName: 'Spring3', color: "#fff"},
{id: 4, techName: 'Kubernetes4', color: "#fff"},
{id: 5, techName: 'Docker5', color: "#fff"},
{id: 6, techName: 'JavaScript6', color: '#fff'},
{id: 7, techName: 'Test7', color: '#fff'},
{id: 8, techName: 'Test8', color: '#fff'}];

@Component({
  selector: 'app-technology-overview',
  templateUrl: './technology-overview.component.html',
  styleUrls: ['./technology-overview.component.css']
})
export class TechnologyOverviewComponent implements AfterViewInit {

  faSearch = faSearch;
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlusSquare;

  animal: string = '';
  techName: string = '';
  technologies: Technology[] = [];
  displayedColumns: string[] = ['techName', 'color', 'actions'];



  dataSource = new MatTableDataSource<Technology>(testTech);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Show add, edit or delete popUp
  openDialog(): void {
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
      width: '250px',
      data: {techName: this.techName}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let newId = this.dataSource.data.length + 1;
      this.dataSource.data.push({id: newId, techName: result, color: '#fff'});
    });
  }

  // Search filter method for technologies table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
