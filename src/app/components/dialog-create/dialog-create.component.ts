import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/model/dialog';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css']
})
export class DialogCreateComponent {

  something: DialogData = new DialogData("", 0, [], 0);
  something2: DialogData = new DialogData("", 0, [], 0);
  toppingList: string[] = ['Java', 'JavaScript', 'Python', 'Docker', 'AWS', 'Spring'];

  constructor(
    public dialogRef: MatDialogRef<DialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {
  }

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'hotdog-3', viewValue: 'Hotdog' }
  ];

  techs = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'hotdog-3', viewValue: 'Hotdog' }
  ];

  change(event: any, counter: number) {
    if (event.isUserInput) {
      this.something.name.push(event.source.value)
      this.something.counter = counter;
    }
  }

  onNoClick() {
    this.something.counter = 0;
    this.dialogRef.close(this.something);
  }

  onYesClick() {
    this.dialogRef.close(this.something);
  }

  changeWeek(event: any) {
    if (event.isUserInput) {
      this.something2.name.push(event.source.value);
      this.something2.counter = this.data.counter
    }
  }

  onNoClickWeek() {
    this.something.counter = 0;
    this.dialogRef.close(this.something2);
  }

  onYesClickWeek() {
    this.dialogRef.close(this.something2);
  }
}
