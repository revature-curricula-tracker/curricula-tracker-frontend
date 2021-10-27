import { Week } from './../../model/week';
import { TopicsForCurriculum } from './../../model/topicsForCurriculum';
import { Technology } from './../../model/technology';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Curriculum } from 'src/app/model/curriculum';
import { Topic } from 'src/app/model/topic';
export interface TopicElement {

}
@Component({
  selector: 'app-curricula-overview',
  templateUrl: './curricula-overview.component.html',
  styleUrls: ['./curricula-overview.component.css']
})
export class CurriculaOverviewComponent implements OnInit {
  title: string = "Curriculum Name";//name to be replaced by which curriculum it is
  editing:boolean=false;//if editing
  tech: Technology[] = [];//array of tech for tech buttons
  weekArray: Week[] = [new Week(1), new Week(2), new Week(3)];
  topicArray: TopicsForCurriculum[] = [];
  testTopic :Topic=new Topic(1,"Test Topic", new Technology(1,"test Tech"));
  testTopic2 :Topic=new Topic(1,"Other Topic", new Technology(2,"other Tech"));
  testT : Topic[]=[this.testTopic, this.testTopic2]
  testC : Curriculum = new Curriculum(1,"Testing Curriculum",10,10*5,this.testT);
  constructor() { }
  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = this.weekArray;

  ngOnInit(): void {
    this.addTopics();
    this.setWeeks();
  }
  addTopics() {
    
    
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testTopic, 1));
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testTopic2, 2));
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testTopic, 3));
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testTopic2, 4));
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testTopic, 5));
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testTopic2, 6));
  }
  setWeeks() {
    this.weekArray[0].days[0].push("starting topic");
    this.weekArray[0].days[1].push("topic1");
    this.weekArray[0].days[1].push("topic2");
    this.weekArray[1].days[2].push("second week topic");
    this.weekArray[0].days[3].push("this topic");
    this.weekArray[0].days[3].push("other topic");
    this.weekArray[0].days[4].push("third topic");
    for (let index = 0; index < this.topicArray.length; index++) {
      let t = this.topicArray[index];
      this.weekArray[Math.floor((t.topic_day) / 5.1)].days[((t.topic_day - 1) % 5)].push(t.topic.name);
    }
  }
  startEdit(){
    if(this.editing==true){
      console.log(`stop editing`);
    
      this.editing=false;
    }
    else this.editing=true;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      let dropId = 0;
      dropId = parseInt(event.container.element.nativeElement.id.substr(14));
      console.log(dropId);
      //update topic date using crud
    }
  }
  counter(i: number) {//create an array of n numbers
    return new Array(i);
  }
}

