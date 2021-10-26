import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { Technology } from 'src/app/model/technology';
import { faPencilAlt, faTrash, faPlusSquare, faSearch} from '@fortawesome/free-solid-svg-icons';

const testTech: Technology[] = [{id: 1, name: 'Java1', color: "#fff"},
{id: 2, name: 'AWS2', color: "#fff"},
{id: 3, name: 'Spring3', color: "#fff"},
{id: 4, name: 'Kubernetes4', color: "#fff"},
{id: 5, name: 'Docker5', color: "#fff"},
{id: 6, name: 'JavaScript6', color: '#fff'},
{id: 7, name: 'Test7', color: '#fff'},
{id: 8, name: 'Test8', color: '#fff'}];

@Component({
  selector: 'app-technology-overview',
  templateUrl: './technology-overview.component.html',
  styleUrls: ['./technology-overview.component.css']
})
export class TechnologyOverviewComponent implements OnInit, AfterViewInit {

  faSearch = faSearch;
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlusSquare;

  animal: string = '';
  name: string = '';
  technologies: Technology[] = [];
  displayedColumns: string[] = ['name', 'color', 'actions'];



  dataSource = new MatTableDataSource<Technology>(testTech);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table: MatTable<Technology>;
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Show add, edit or delete popUp
  openDialog(): void {
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
      width: '250px',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let newId = this.dataSource.data.length + 1;
      this.dataSource.data.push({id: newId, name: result, color: '#fff'});
      //this.table.renderRows();
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
