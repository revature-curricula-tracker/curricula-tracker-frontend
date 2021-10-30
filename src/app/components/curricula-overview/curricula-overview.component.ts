import { CurriculumTopicKey } from './../../model/CurriculumTopicKey';
import { Week } from './../../model/week';
import { TopicsForCurriculum } from './../../model/topicsForCurriculum';
import { Technology } from './../../model/technology';
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Curriculum } from 'src/app/model/curriculum';
import { Topic } from 'src/app/model/topic';
import { CurriculaService } from 'src/app/services/curricula.service';
export interface TopicElement {

}
@Component({
  selector: 'app-curricula-overview',
  templateUrl: './curricula-overview.component.html',
  styleUrls: ['./curricula-overview.component.css']
})
export class CurriculaOverviewComponent implements OnInit {

  editing: boolean = false;//if editing
  tech: Technology[] = [];//array of tech for tech buttons
  topicArray: TopicsForCurriculum[] = [];
  //TESTING MODELS, DELETE AFTER ACTUALLY GETTING SERVICE METHODS
  testKey: CurriculumTopicKey = new CurriculumTopicKey(1, 1);
  testTech: Technology = new Technology(1, "Angular", "", []);
  testTech2: Technology = new Technology(2, "Javascript", "", []);
  testTopic: Topic = new Topic("Angular topic", 1, "Angular Fun", this.testTech);
  testTopic2: Topic = new Topic("topic that has a long name", 1, "JavaScript Advanced Topic for everything and anything", this.testTech2);
  testT: Topic[] = [this.testTopic, this.testTopic2]
  testC: Curriculum = new Curriculum(1, "Testing Curriculum", 10, 10 * 5);

  title: string = this.testC.curriculumName; //name to be replaced by which curriculum it is
  weekArray: Week[] = [new Week(1), new Week(2), new Week(3), new Week(4), new Week(5), new Week(6), new Week(7), new Week(8), new Week(9), new Week(10), new Week(11)];
  constructor(private curService: CurriculaService) { }

  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = this.weekArray;
  ngOnInit(): void {
    this.getTopicData();
    this.weekArray.length = 3;

  }
  addTopics() {

    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testKey, this.testTopic, 1));
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testKey, this.testTopic2, 2));
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testKey, this.testTopic, 10));
    this.topicArray.push(new TopicsForCurriculum(this.testC, this.testKey, this.testTopic, 2));
    this.setWeeks();

  }
  setWeeks() {
    for (let t of this.topicArray) {
      this.weekArray[Math.floor((t.topicDay) / 5.1)].days[((t.topicDay - 1) % 5)].push(t);
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
        console.log(dropId);
        //update topic date using crud
      }

    }
  }
  counter(i: number) {//create an array of n numbers
    return new Array(i);
  }
  stringToColor(str: string) {
    var hash = 1;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var color = '#';
    for (var i2 = 0; i2 < 3; i2++) {
      var value = (hash >> (i2 * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }
  public getTopicData(): any {
    this.curService.getAllTopicsForCurriculum().subscribe(data => {
      console.log(data);

      data.forEach(t => {
        this.topicArray.push(t);
        console.log(t.curriculum.curriculumName + " " + t.topic.technology);
        this.weekArray[Math.floor((t.topicDay) / 5.1)].days[((t.topicDay - 1) % 5)].push(t)
      });
    }).add(this.addTopics())

  }
}

