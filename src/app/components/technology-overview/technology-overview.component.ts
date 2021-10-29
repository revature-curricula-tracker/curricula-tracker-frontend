import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { Technology } from 'src/app/model/technology';
import { faPencilAlt, faTrash, faPlusSquare, faSearch, faPalette } from '@fortawesome/free-solid-svg-icons';
import { TechnologyService } from 'src/app/services/technology.service';
import { ThemePalette } from "@angular/material/core";

@Component({
  selector: 'app-technology-overview',
  templateUrl: './technology-overview.component.html',
  styleUrls: ['./technology-overview.component.css']
})
export class TechnologyOverviewComponent implements AfterViewInit {

  public disabled = false;
  public color: ThemePalette = 'primary';
  public touchUi = false;

  faSearch = faSearch;
  faPencil = faPencilAlt;
  faTrash = faTrash;
  faPlus = faPlusSquare;
  faPalette = faPalette;

  techName: string = '';
  technologies: Technology[] = [];
  displayedColumns: string[] = ['techName', 'color', 'actions'];

  dataSource = new MatTableDataSource<Technology>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(public dialog: MatDialog, private techService: TechnologyService) { }


  ngAfterViewInit() {
    this.techService.getAllTechnologies().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Show add, edit or delete popUp
  openDialog(type: string, row?: Technology): void {
    let dialogHeight = '350px';
    
    if (type == 'delete') {
      dialogHeight = '250px';
    }
    
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
      width: '275px',
      height: dialogHeight,
      data: { 
        techName: this.techName, 
        type,
        row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed dialog");
      if (result !== undefined) {
        this.techService.createTechnology(result).subscribe((data: Technology) => {
          console.log(`Sent to the database --> ${data}`);
          this.dataSource.data.push(data);
        })
        console.log("Created technology" + JSON.stringify(result));
      }
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
