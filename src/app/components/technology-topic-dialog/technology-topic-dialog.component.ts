import { TopicsService } from './../../services/topics.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faPencilAlt, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Topic } from '../../model/topic';
import { Technology } from 'src/app/model/technology';
import { ToastrService } from 'ngx-toastr';

export interface DialogData {
  tech: Technology;
}

@Component({
  selector: 'app-technology-topic-dialog',
  templateUrl: './technology-topic-dialog.component.html',
  styleUrls: ['./technology-topic-dialog.component.css']
})
export class TechnologyTopicDialogComponent implements OnInit {

  topics: Topic[] = [];
  edit = {target: 0, state: false, btnOneState: 'Edit', btnTwoState: 'Remove'};
  confirmDelete = {target: 0, state: false};
  createOpen = false;

  faPencil = faPencilAlt;
  faWarning = faExclamationCircle;
  faClose = faTimes;

  // Setting new form for topic edit
  editName = new FormControl('');
  editDescription = new FormControl('');
  // Setting new form for topic edit

  createTopicForm = new FormGroup({
    createName: new FormControl(''),
    createDescription: new FormControl('')
  })


  constructor(
    public dialogRef: MatDialogRef<TechnologyTopicDialogComponent>,
    private topicService: TopicsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastr: ToastrService) {}
    
    ngOnInit(): void {
      this.topics = [...this.data.tech.topics];
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

    createTopic() {
      if (this.createTopicForm.valid) {
        let form = this.createTopicForm.value;
        let newTopic = new Topic(form.createDescription, 0, form.createName, this.data.tech);

        this.topicService.addTopic(newTopic).subscribe(data => {
          this.topics.push(data);
          this.createTopicForm.reset({createName: '', createDescription: ''});
          this.toastr.success(`Successfully created ${data.name}`, "Create Successful");
        });
      }
    }

    saveEditTopic(topic: Topic) {
      let oldName = topic.name;
      this.topicService.updateTopicByName(topic, oldName).subscribe(_data => {
        topic.name = this.editName.value;
        topic.description = this.editDescription.value;
        this.toastr.success(`Edited successful: ${oldName} to ${topic.name}`, "Edit Successful");
        this.edit.state = false;
        this.edit.target = 0;
      });
      
    }

    deleteTopic(topic: Topic) {
      let hasId = ((obj: Topic) => obj.id == topic.id);
      let indexToRemove = this.topics.findIndex(hasId);
      
      this.topicService.deleteTopicByName(topic.name)
      .subscribe(_data => {
        this.confirmDelete.target = 0;
        this.confirmDelete.state = false;
        this.topics.splice(indexToRemove, 1);
      });
    }

    closeDialog() {
      this.dialogRef.close(this.topics);
    }

    onNoClick(): void {
      this.dialogRef.close(this.topics);
    }
    
}
