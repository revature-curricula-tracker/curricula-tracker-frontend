import { TechnologyService } from 'src/app/services/technology.service';
import { TopicsService } from './../../services/topics.service';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPencilAlt, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
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
  faWarning = faExclamationCircle;
  confirmDelete = {target: 0, state: false};

  // Setting new form for topic edit
  editName = new FormControl('');
  editDescription = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<TechnologyTopicDialogComponent>,
    private topicService: TopicsService,
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

    deleteTopic(topic: Topic) {

      console.log(`Removing - ${topic.name}`);
      let hasId = ((obj: Topic) => obj.id == topic.id);
      let indexToRemove = this.topics.findIndex(hasId);

      this.confirmDelete.target = 0;
      this.confirmDelete.state = false;
      this.topics.splice(indexToRemove, 1);

      /* this.topicService.deleteTopicByName(topic.name)
        .subscribe(data => console.log(data)); */
    }

    closeDialog() {
      this.dialogRef.close(this.topics);
    }

    onNoClick(): void {
      this.dialogRef.close(this.topics);
    }
    
}
