import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TechnologyService } from 'src/app/services/technology.service';
import { Technology } from 'src/app/model/technology';

export interface DialogData {
  id: number,
  type: string; 
  techName: string;
  colorHex: string;
  row?: Technology;
}

@Component({
  selector: 'app-technology-dialog',
  templateUrl: './technology-dialog.component.html',
  styleUrls: ['./technology-dialog.component.css']
})
export class TechnologyDialogComponent implements OnInit{

  dialogType = '';
  incomingRow: Technology | null | undefined;

  constructor(
    public dialogRef: MatDialogRef<TechnologyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private techService: TechnologyService
  ) { }

  ngOnInit(): void {
    this.dialogType = this.data.type;
    this.incomingRow = this.data.row;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCreateClick(form: NgForm): void {
    this.dialogRef.close(new Technology(0, form.value.techName, form.value.colorHex));
  }

  deleteTech(id: number): void {
    console.log(id);
    this.techService.deleteTechnology(id);
    this.dialogRef.close();
  }

  editTech(form: NgForm): void {
    // edit logic
    console.log(JSON.stringify(form));
    this.dialogRef.close();
  }
}
