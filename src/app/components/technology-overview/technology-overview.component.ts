import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { TechnologyDialogComponent } from '../technology-dialog/technology-dialog.component';
import { Technology } from 'src/app/model/technology';

@Component({
  selector: 'app-technology-overview',
  templateUrl: './technology-overview.component.html',
  styleUrls: ['./technology-overview.component.css']
})
export class TechnologyOverviewComponent implements OnInit {

  animal: string = '';
  name: string = '';
  technologies: Technology[] = [];
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TechnologyDialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}
