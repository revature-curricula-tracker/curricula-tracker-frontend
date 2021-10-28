import { CurriculumTopicKey } from './../../model/CurriculumTopicKey';
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
  editing: boolean = false;//if editing
  tech: Technology[] = [];//array of tech for tech buttons
  weekArray: Week[] = [new Week(1), new Week(2), new Week(3)];
  topicArray: TopicsForCurriculum[] = [];
  //TESTING MODELS, DELETE AFTER ACTUALLY GETTING SERVICE METHODS
  testKey: CurriculumTopicKey = new CurriculumTopicKey(1, 1);
  testTech: Technology = new Technology(1, "Java", "");
  testTech2: Technology = new Technology(2, "Javascript", "");
  testTopic: Topic = new Topic(1, "Java Fun", "fun topic", this.testTech);
  testTopic2: Topic = new Topic(1, "JavaScript Advanced Topic for everything and anything", "topic that has a long name", this.testTech2);
  testT: Topic[] = [this.testTopic, this.testTopic2]
  testC: Curriculum = new Curriculum(1, "Testing Curriculum", 10, 10 * 5, this.testT);
  constructor() { }
  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = this.weekArray;

  ngOnInit(): void {
    this.addTopics();
    this.setWeeks();
  }
  addTopics() {
    this.topicArray.push(new TopicsForCurriculum(this.testKey, this.testC, this.testTopic, 1));
    this.topicArray.push(new TopicsForCurriculum(this.testKey, this.testC, this.testTopic2, 2));
    this.topicArray.push(new TopicsForCurriculum(this.testKey, this.testC, this.testTopic, 3));
    this.topicArray.push(new TopicsForCurriculum(this.testKey, this.testC, this.testTopic2, 4));
    this.topicArray.push(new TopicsForCurriculum(this.testKey, this.testC, this.testTopic, 5));
    this.topicArray.push(new TopicsForCurriculum(this.testKey, this.testC, this.testTopic2, 6));
    this.topicArray[0].topic.tech.name
  }
  setWeeks() {
    for(let t of this.topicArray){
      this.weekArray[Math.floor((t.topic_day) / 5.1)].days[((t.topic_day - 1) % 5)].push(t);
    }
  }
  startEdit() {
    if (this.editing) {
      this.editing = false;
    }
    else this.editing = true;
  }
  drop(event: CdkDragDrop<string[]>) {
    if (this.editing) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        let dropId = 0;
        dropId = parseInt(event.container.element.nativeElement.id.substr(14));
        //update topic date using crud
      }

    }
  }
  counter(i: number) {//create an array of n numbers
    return new Array(i);
  }
  stringToColor(str:string) {
    var hash = 1;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    
    return color;
  }
}

