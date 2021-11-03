import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Week } from 'src/app/model/week';
import { DialogData } from 'src/app/model/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { Technology } from 'src/app/model/technology';

@Component({
  selector: 'app-curriculum-create',
  templateUrl: './curriculum-create.component.html',
  styleUrls: ['./curriculum-create.component.css']
})
export class CurriculumCreateComponent implements OnInit {

  // hello: any[] = []; // 'something', 'something2', 'something3'
  weekArray: Week[] = [new Week(1)]; // , new Week(2), new Week(3), new Week(4), new Week(5), new Week(6), new Week(7), new Week(8), new Week(9), new Week(10), new Week(11)
  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = new MatTableDataSource(this.weekArray); // this.weekArray;
  currentItem: any;
  counter: number = 0;
  input !: string;
  title !: string;
  curriculumId !: number;
  name !: string;
  id: number = 0;
  // something: DialogData = new DialogData("", 0, [], 0);
  // techArray: DialogData = new DialogData("", 0, [], 0);
  newDialogData: DialogData[] = [];
  newDialogData2: DialogData[] = [];
  icon = faPlusSquare;
  // tech: Technology[] = [];
  weekObj: any[] = [{
    selectedTech: [],
    weekId: 0
  }];

  dayObj: any[] = [{
    selectedTech: [],
    dayId: 0
  }];

  constructor(public dialog: MatDialog, private toastr: ToastrService, private curriculumService: CurriculumService) { }

  openDialog(input: string, days: number, id: number): void {
    this.counter = (id - 1) * 5 + days; // 0 1 2 3 ...
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '250px',
      data: { input: input, counter: this.counter },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.something = result;
      this.newDialogData.push(result);
      this.counter = 0;
    });

  }

  openDialog4(input: string): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '250px',
      data: { input: input, curriculumId: this.curriculumId },
      disableClose: true,
    });
  }

  openDialogForWeek(input: string, id: number): void {
    this.id = id;
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '250px',
      data: { input: input, counter: this.id },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newDialogData2.push(result);
      this.currentItem = this.newDialogData2;
      // this.techArray.push(result);
      this.counter = 0;
    });
  }

  openDialog2(input: String, weekObj: any[], id: number, days: number): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '250px',
      data: { input: input, curriculumId: this.curriculumId, weekObj: weekObj, counter: id, days: days },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`result is ${JSON.stringify(result)}`);
      for (let values of this.dayObj) {
        if (values.dayId === result.weekId) {
          values.selectedTech = result.selectedTech;
          return;
        }
      }
      this.dayObj.push(result);
    });

  }

  openDialogWeek(input: String, id: number): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '250px',
      data: { input: input, curriculumId: this.curriculumId, counter: id },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      for (let values of this.weekObj) {
        if (values.weekId === result.weekId) {
          values.selectedTech = result.selectedTech;
          return;
        }
      }
      this.weekObj.push(result); // 
      console.log(`hello ${JSON.stringify(this.weekObj)}`);
    });

  }


  openDialog3(): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '250px',
      data: { input: this.input },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.something = result;
      // this.newDialogData.push(result);
      this.title = result.curriculumName;
      this.curriculumId = result.curriculumId;
    });

  }

  createTable() {
    let counter = this.weekArray.length;
    // console.log(`counter is ${counter} and next counter is ${counter++}`);
    counter++; // this works apprently
    this.weekArray.push(new Week(counter));
    this.dataSource.data = this.weekArray; // this will show but the data won't persist
  }

  removeTable() {
    let counter = this.weekArray.length;
    if (counter <= 1) {
      this.errorToastr("Cannot delete the first table")
    }
    else {
      this.weekArray.pop();
      this.dataSource.data = this.weekArray;
    }
  }

  ngOnInit(): void {
    this.openDialog3();
  }

  public errorToastr(message: string) {
    this.toastr.error(message, "Deleting Failed");
  }



}


