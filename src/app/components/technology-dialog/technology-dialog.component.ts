import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  technology: string;
}

@Component({
  selector: 'app-technology-dialog',
  templateUrl: './technology-dialog.component.html',
  styleUrls: ['./technology-dialog.component.css']
})
export class TechnologyDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TechnologyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
