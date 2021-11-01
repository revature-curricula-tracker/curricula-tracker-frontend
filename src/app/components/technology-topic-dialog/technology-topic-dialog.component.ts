import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Topic } from '../../model/topic';

export interface DialogData {
  topics: Topic[];
}

@Component({
  selector: 'app-technology-topic-dialog',
  templateUrl: './technology-topic-dialog.component.html',
  styleUrls: ['./technology-topic-dialog.component.css']
})
export class TechnologyTopicDialogComponent implements OnInit {

  topics: Topic[] = [];

  constructor(
    public dialogRef: MatDialogRef<TechnologyTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
    ngOnInit(): void {
      this.topics = [...this.data.topics];
    }

    closeDialog() {

    }

    closeAndCreateTopic(){
      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    
}
