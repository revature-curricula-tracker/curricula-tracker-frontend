import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TechnologyService } from 'src/app/services/technology.service';
import { Technology } from 'src/app/model/technology';
import { Topic } from 'src/app/model/topic';
import { ToastrService } from 'ngx-toastr';

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
    private techService: TechnologyService,
    private toastr: ToastrService
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

  deleteTech(incomingRow: Technology): void {
    console.log(incomingRow.techId);
    this.techService.deleteTechnology(incomingRow.techId).subscribe(data => {
      console.log(data);
      if (data) {
        this.deleteSuccess(incomingRow.techName);
        this.dialogRef.close({typeDialog: 'delete', row: this.data.row});
      } else {
        // Dialog close response error here and in tech overview
        this.deleteError();
        this.dialogRef.close();
      }
    });
    
  }

  editTech(form: NgForm): void {
    // edit logic
    let editedTech = new Technology(this.editId!, this.editName!, this.editColor!, this.incomingRow!.topics);
    this.techService.updateTechnology(editedTech).subscribe(data => {
      console.log(data);
      if (data != null) {
        this.editSuccess(editedTech.techName);
        this.dialogRef.close({typeDialog: 'edit', row: data});
      } else {
        // Dialog close response error here and in tech overview
        this.editError();
        this.dialogRef.close();
      }
    });
    
  }

  public deleteSuccess(name: string) {
    this.toastr.success(`Successfully deleted ${name}`, "Delete Successful");
  }

  public editSuccess(name: string) {
    this.toastr.success(`Successfully edited ${name}`, "Edit Successful");
  }

  public deleteError() {
    this.toastr.error("Unable to delete technology", "Error");
  }

  public editError() {
    this.toastr.error("Unable to edit technology", "Error");
  }
}
