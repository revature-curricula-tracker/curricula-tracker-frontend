import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { Technology } from 'src/app/model/technology';
import { faPencilAlt, faTrash, faPlusSquare, faSearch, faPalette, faSquare } from '@fortawesome/free-solid-svg-icons';
import { TechnologyService } from 'src/app/services/technology.service';
import { ThemePalette } from "@angular/material/core";
import { Observable, ReplaySubject } from 'rxjs';

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
      console.log(this.technologies);
      this.dataSource.data = [...this.technologies];
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // Show add, edit or delete popUp
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
      console.log("Closed dialog");

      if (result !== undefined && result.typeDialog == 'create') {
        this.techService.createTechnology(result.row).subscribe((data: Technology) => {
          console.log(`Sent to the database --> ${data}`);
          this.technologies.unshift(data);
          this.dataSource.data = [...this.technologies];
        })
        console.log("Created technology" + JSON.stringify(result));
      } else if (result !== undefined && result.typeDialog !== 'create'){
        this.closeTypeDialog(result);
      }
    });
  }

  closeTypeDialog(closedObj: any) {
    let hasId = ((obj: Technology) => obj.techId == closedObj.row.techId);
    let indexToRemove = this.technologies.findIndex(hasId);

    if (closedObj.typeDialog == 'delete') {
      this.technologies.splice(indexToRemove, 1);
    } else if (closedObj.typeDialog == 'edit') {
      this.technologies.splice(indexToRemove, 1, closedObj.row);
    }

    this.dataSource.data = [...this.technologies];

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