import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Curriculum } from 'src/app/model/curriculum';
import { DialogData } from 'src/app/model/dialog';
import { Technology } from 'src/app/model/technology';
import { Topic } from 'src/app/model/topic';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { TechnologyService } from 'src/app/services/technology.service';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css']
})
export class DialogCreateComponent implements OnInit {

  something: DialogData = new DialogData("", 0, [], 0, 0, []);
  curriculum: Curriculum = new Curriculum(0, "", 0, 0, []);
  technology: Technology = new Technology(0, "", "", []);

  topic: Topic = new Topic("not used", 0, "", this.technology, this.curriculum, 0);

  tech: Technology[] = [];
  topicArray: Topic[] = [];

  weekObj: any = {
    selectedTech: [],
    weekId: 0
  };

  weekObj2: any[] = [{
    selectedTech: [],
    weekId: 0
  }];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogCreateComponent>,
    public dialog: MatDialog,
    private router: Router,
    private curriculumService: CurriculumService,
    private techService: TechnologyService,
    private topicService: TopicsService) {
  }

  change(event: any, counter: number) {
    console.log(`event is ${JSON.stringify(event.isUserInput)}`);
    if (event.isUserInput) {
      this.something.name.push(event.source.value)
      this.something.counter = counter;
    }
  }
  changeWeek(event: any) {
    //console.log(`event week is ${JSON.stringify(event.source)}`);
    if (event.isUserInput) {
      if (event.source.selected) {
        this.weekObj.weekId = this.data.counter;
        this.weekObj.selectedTech.push(event.source.value);
      } else {
        this.weekObj.selectedTech.forEach((element: any, index: number) => {
          if (element == event.source.value) {
            this.weekObj.selectedTech.splice(index, 1);
          }
        });
      }
    }
  }

  changeTopic(event: any) {
    // console.log(`event topic is ${JSON.stringify(event.source.selected)}`);
    if (event.isUserInput) {
      if (event.source.selected) {
        this.weekObj.weekId = this.data.counter;
        this.weekObj.selectedTech.push(event.source.value);
      }
      else {
        this.weekObj.selectedTech.forEach((element: any, index: number) => {
          if (element === event.source.value) {
            this.weekObj.selectedTech.splice(index, 1);
          }
        });
      }
    }
  }

  cancelDialog() {
    this.dialogRef.close();
  }
  confirmWeek() {
    this.dialogRef.close(this.weekObj);
  }
  cancelInput() {
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }

  confirmInput() {
    if (this.curriculum.curriculumName === '') {
      // have a toast
    }
    else {
      this.curriculumService.addCurriculum(this.curriculum).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

  }
  confirmCreate() {
    if (!this.topic.name || !this.topic.technology) {
      // have a toast
    }
    else {
      console.log(`topic is ${JSON.stringify(this.topic)}`);
      this.topicService.addTopic(this.topic).subscribe(res => {
      });
      this.dialogRef.close();
    }
  }
  confirmTopic() {
    for (let i = 0; i < this.weekObj.selectedTech.length; i++) {
      this.topic = this.weekObj.selectedTech[i];
      this.topic.curriculum = this.curriculum;
      this.topic.topicDay = (this.data.counter - 1) * 5 + this.data.days;
      // this.weekObj.selectedTech.push(this.topic);y = (this.data.counter - 1) * 5 + this.data.days;
      this.topic.id = 0;
      this.topicService.addTopic(this.topic).subscribe(res => {
        this.weekObj.selectedTech.push(res);
      });
    }
    this.weekObj.weekId = (this.data.counter - 1) * 5 + this.data.days;
    console.log(`week obj ${JSON.stringify(this.weekObj)}`);
    this.dialogRef.close(this.weekObj);
  }
  ngOnInit() {
    this.techService.getAllTechnologies().subscribe(res => {
      this.tech = res;
      if (this.data.weekObj) {
        // this.weekObj2 = this.data.weekObj;
        for (let values of this.data.weekObj) {
          // they are the same week
          if (values.weekId === this.data.counter) {
            // go through
            for (let i = 0; i < values.selectedTech.length; i++) {
              this.tech.forEach(x => {
                // filter
                if (x.techName === values.selectedTech[i]) {
                  for (let j = 0; j < x.topics.length; j++) {
                    // push it to array
                    this.topicArray.push(x.topics[j]);
                    // WE DO NOT CHECK FOR DUPLICATES
                  }
                }
              })
            }
          }
        }
      }
    });
    if (this.data.curriculumId) {
      this.curriculumService.findById(this.data.curriculumId).subscribe(res => {
        this.topic.curriculum = res;
        this.curriculum = res;
      });
    }
  }
}
