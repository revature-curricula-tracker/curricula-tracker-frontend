import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
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
  edit = {target: 0, state: false, btnOneState: 'Edit', btnTwoState: 'Remove'};
  faPencil = faPencilAlt;

  // Setting new form for topic edit
  editName = new FormControl('');
  editDescription = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<TechnologyTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
    ngOnInit(): void {
      this.topics = [...this.data.topics];
    }

    editTopic(topic: Topic) {
      this.edit.target = topic.id;
      this.edit.state = true;
      this.editName.setValue(topic.name);
      this.editDescription.setValue(topic.description);
    }

    cancelEdit() {
      this.edit.target = 0;
      this.edit.state = false;
    }

    saveEditTopic(topic: Topic) {
      topic.name = this.editName.value;
      topic.description = this.editDescription.value;
      this.edit.state = false;
    }

    removeTopic(topic: Topic) {

    }

    closeDialog() {

    }

    closeAndCreateTopic(){
      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }
    
}
