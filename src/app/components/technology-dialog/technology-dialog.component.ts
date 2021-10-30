import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TechnologyService } from 'src/app/services/technology.service';
import { Technology } from 'src/app/model/technology';
import { Topic } from 'src/app/model/topic';

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
  editName? = '';
  editId? = 0;
  editColor? = '';

  constructor(
    public dialogRef: MatDialogRef<TechnologyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private techService: TechnologyService
  ) { }

  ngOnInit(): void {
    this.dialogType = this.data.type;
    this.incomingRow = this.data.row;

    if (this.data.type == 'edit') {
      this.editId = this.data.row?.techId;
      this.editName = this.data.row?.techName;
      this.editColor = this.data.row?.color
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onCreateClick(form: NgForm): void {
    let createdTech = new Technology(0, form.value.techName, form.value.colorHex, [])
    this.dialogRef.close({typeDialog: 'create', row: createdTech});
  }

  deleteTech(id: number): void {
    console.log(id);
    this.techService.deleteTechnology(id);
    this.dialogRef.close({typeDialog: 'delete', row: this.data.row});
  }

  editTech(form: NgForm): void {
    // edit logic
    let editedTech = new Technology(this.editId!, this.editName!, this.editColor!, this.incomingRow!.topics);
    this.techService.editTechnology(editedTech);
    this.dialogRef.close({typeDialog: 'edit', row: editedTech});
  }
}
