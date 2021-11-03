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
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dialog-create',
  templateUrl: './dialog-create.component.html',
  styleUrls: ['./dialog-create.component.css']
})
export class DialogCreateComponent implements OnInit {

  faClose = faTimes;

  something: DialogData = new DialogData("", 0, [], 0, 0, []);
  curriculum: Curriculum = new Curriculum(0, "", 1, 0, []);
  technology: Technology = new Technology(0, "", "", []);

  topic: Topic = new Topic("not used", 0, "", this.technology, this.curriculum, 0);

  tech: Technology[] = [];
  topicArray: Topic[] = [];

  weekObj: any = {
    selectedTech: [],
    weekId: 0
  };

  dayObj: any = {
    selectedTech: [],
    weekId: 0,
    dayId: 0
  };

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
    if (event.isUserInput) {
      this.something.name.push(event.source.value)
      this.something.counter = counter;
    }
  }
  changeWeek(event: any) {
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
    if (event.isUserInput) {
      if (event.source.selected) {
        this.dayObj.weekId = this.data.counter;
        this.dayObj.dayId = this.data.days;
        this.dayObj.selectedTech.push(event.source.value);
      }
      else {
        this.dayObj.selectedTech.forEach((element: any, index: number) => {
          if (element === event.source.value) {
            this.dayObj.selectedTech.splice(index, 1);
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
    for (let i = 0; i < this.dayObj.selectedTech.length; i++) {
      this.topic = this.dayObj.selectedTech[i];
      this.topic.curriculum = this.curriculum;
      this.topic.topicDay = (this.data.counter - 1) * 5 + (this.data.days + 1);
      this.topic.id = 0;
      console.log("topic object" + JSON.stringify(this.topic))
      this.topicService.addTopic(this.topic).subscribe(res => {
        this.dayObj.selectedTech.push(res);
      })
    }
    // this.weekObj.weekId = (this.data.counter - 1) * 5 + this.data.days;
    this.dialogRef.close(this.dayObj);
  }
  ngOnInit() {
    if(this.data.weekObj){
      for (let i = 0; i < this.data.weekObj[this.data.counter - 1].techs.length; i++){
        this.techService.getTechnologyByName(this.data.weekObj[this.data.counter - 1].techs[i]).subscribe(res => {
        for(let j = 0; j < res.topics.length; j++){
          console.log(JSON.stringify(res.topics))
          res.topics[j]['technology'] = new Technology(res.techId, res.techName, res.color, []);
          this.topicArray.push(res.topics[j]);
          console.log(this.topicArray)
        }
      })
      }
  }
  this.techService.getAllTechnologies().subscribe(res => {
    this.tech = res;
  })
  if (this.data.curriculumId) {
    this.curriculumService.findById(this.data.curriculumId).subscribe(res => {
      this.topic.curriculum = res;
      this.curriculum = res;
    });
  }
 }
}
