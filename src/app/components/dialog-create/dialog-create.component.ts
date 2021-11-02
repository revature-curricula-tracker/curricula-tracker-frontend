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
  something2: DialogData = new DialogData("", 0, [], 0, 0, []);

  curriculum: Curriculum = new Curriculum(0, "", 0, 0, []);
  technology: Technology = new Technology(0, "", "", []);

  topic: Topic = new Topic("not used", 0, "", this.technology, this.curriculum, 0);

  toppingList: string[] = ['Java', 'JavaScript', 'Python', 'Docker', 'AWS', 'Spring'];
  tech: Technology[] = [];
  topicArray: Topic[] = [];
  // selectedTech: Technology[] = [];
  weekObj: any = {
    selectedTech: [],
    weekId: 0
  };

  weekObj2: any[] = [{
    selectedTech: [],
    weekId: 0
  }];




  constructor(
    public dialogRef: MatDialogRef<DialogCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private router: Router,
    private curriculumService: CurriculumService,
    private techService: TechnologyService,
    private topicService: TopicsService) {
  }

  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'hotdog-3', viewValue: 'Hotdog' }
  ];

  techs = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
    { value: 'hotdog-3', viewValue: 'Hotdog' }
  ];

  change(event: any, counter: number) {
    if (event.isUserInput) {
      this.something.name.push(event.source.value)
      this.something.counter = counter;
    }
  }

  // onNoClick() {
  //   this.something.counter = 0;
  //   this.dialogRef.close(this.something);
  // }

  // onYesClick() {
  //   this.dialogRef.close(this.something);
  // }

  changeWeek(event: any) {
    if (event.isUserInput) {
      // this.selectedTech.push(event.source.value);
      this.weekObj.weekId = this.data.counter;
      this.weekObj.selectedTech.push(event.source.value);
    }
  }

  changeTopic(event: any) {
    if (event.isUserInput) {
      // this.selectedTech.push(event.source.value);
      this.weekObj.weekId = this.data.counter;
      this.weekObj.selectedTech.push(event.source.value);
    }
  }

  // changeCreate(event: any) {
  //   // if (event.isUserInput) {
  //   //   event.source.value == technology assign
  //   //   this.something2.name.push();
  //   //   this.something2.counter = this.data.counter
  //   // }
  // }

  onNoClickWeek() {
    this.dialogRef.close();
  }

  onYesClickWeek() {
    this.dialogRef.close(this.weekObj);
  }

  onNoClickInput() {
    this.dialogRef.close();
    this.router.navigate(['/home']);

  }

  onYesClickInput() {
    if (this.curriculum.curriculumName === '') {
      // have a toast
    }
    else {
      this.curriculumService.addCurriculum(this.curriculum).subscribe(res => {
        this.dialogRef.close(res);
      });
    }

  }


  onNoClickCreate() {
    this.dialogRef.close();
  }

  onYesClickCreate() {
    if (!this.topic.name || !this.topic.technology) {
      // have a toast
    }
    else {
      // console.log(`something ${JSON.stringify(this.topic.technology)}`);
      // this.curriculumService.addCurriculum(this.curriculum).subscribe(res => {
      //   this.dialogRef.close(res);
      // });
      console.log(`topic is ${JSON.stringify(this.topic)}`);
      this.topicService.addTopic(this.topic).subscribe(res => {
      });
      this.dialogRef.close();
    }
  }

  onNoClickTopic() {
    this.dialogRef.close();
  }

  onYesClickTopic() {
    for (let i = 0; i < this.weekObj.selectedTech.length; i++) {
      this.topic = this.weekObj.selectedTech[i];
      this.topic.curriculum = this.curriculum;
      this.topic.topicDay = (this.data.counter - 1) * 5 + this.data.days;
      this.topic.id = 0;
      this.topicService.addTopic(this.topic).subscribe(res => {
        this.weekObj.selectedTech.push(res);
      });
    }
    this.weekObj.weekId = (this.data.counter - 1) * 5 + this.data.days;
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
