import { Week } from './../../model/week';
import { TopicsForCurriculum } from './../../model/topicsForCurriculum';
import { Technology } from './../../model/technology';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
export interface TopicElement {

}
@Component({
  selector: 'app-curricula-overview',
  templateUrl: './curricula-overview.component.html',
  styleUrls: ['./curricula-overview.component.css']
})
export class CurriculaOverviewComponent implements OnInit {
  title: string = "Curriculum Name";//name to be replaced by which curriculum it is
  tech: Technology[] = [];//array of tech for tech buttons
  weekArray: Week[] = [new Week(1), new Week(2), new Week(3)];
  topicArray: TopicsForCurriculum[] = [];

  constructor() { }
  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = this.weekArray;

  ngOnInit(): void {
    this.addTopics();
    this.setWeeks();
  }
  addTopics() {
    this.topicArray.push(new TopicsForCurriculum(1, 4, 1));
    this.topicArray.push(new TopicsForCurriculum(2, 5, 2));
    this.topicArray.push(new TopicsForCurriculum(2, 6, 3));
    this.topicArray.push(new TopicsForCurriculum(2, 7, 4));
    this.topicArray.push(new TopicsForCurriculum(3, 8, 5));
    this.topicArray.push(new TopicsForCurriculum(3, 9, 6));
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
      this.weekArray[Math.floor((t.topic_day) / 5.1)].days[((t.topic_day-1) % 5)].push(t.topic_id.toString());
    }
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  counter(i: number) {//create an array of n numbers
    return new Array(i);
  }
}

