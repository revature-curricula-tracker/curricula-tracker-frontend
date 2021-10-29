import { ActivatedRoute } from '@angular/router';
import { CurriculumTopicKey } from './../../model/CurriculumTopicKey';
import { Week } from './../../model/week';
import { TopicsForCurriculum } from './../../model/topicsForCurriculum';
import { Technology } from './../../model/technology';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() curriculum !: Curriculum;

  editing: boolean = false;//if editing
  tech: Technology[] = [];//array of tech for tech buttons
  topicArray: TopicsForCurriculum[] = [];

  //TESTING MODELS, DELETE AFTER ACTUALLY GETTING SERVICE METHODS
  testKey: CurriculumTopicKey = new CurriculumTopicKey(1, 1);
  testTech: Technology = new Technology(1, "Angular", "");
  testTech2: Technology = new Technology(2, "Javascript", "");
  testTopic: Topic = new Topic("Angular topic", 1, "Angular Fun", this.testTech);
  testTopic2: Topic = new Topic("topic that has a long name", 1, "JavaScript Advanced Topic for everything and anything", this.testTech2);
  testT: Topic[] = [this.testTopic, this.testTopic2];
  
  weekArray: Week[] = [];
  title = this.curriculum?.curriculumName || "No Curriculum Chosen"; //name to be replaced by which curriculum it is
  btnStyle = 'edit-btn-default';
  constructor(private curService: CurriculaService, private route: ActivatedRoute) {
    this.curriculum = this.curriculum || new Curriculum(1, "Testing Curriculum", 10, 10 * 5);
  }

  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = this.weekArray;
  ngOnInit(): void {
    this.getCurriculum(this.route.snapshot.params['id'])

    for (let i = 1; i <= this.curriculum.numWeeks; i++) {
      this.weekArray.push(new Week(i));
    }
    this.tech.push(this.testTech);
    this.tech.push(this.testTech2);
    this.getTopicData();

  }
  addTopics() {
    this.topicArray.push(new TopicsForCurriculum(this.curriculum, this.testKey, this.testTopic, 1));
    this.topicArray.push(new TopicsForCurriculum(this.curriculum, this.testKey, this.testTopic2, 2));
    this.topicArray.push(new TopicsForCurriculum(this.curriculum, this.testKey, this.testTopic, 10));
    this.topicArray.push(new TopicsForCurriculum(this.curriculum, this.testKey, this.testTopic, 2));
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
      this.btnStyle = 'edit-btn-default';
    }
    else {
      this.editing = true;
      this.btnStyle = 'edit-btn-change';
    }
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
  counter(i: number): Array<number> {//create an array of n numbers
    return new Array(i);
  }
  stringToColor(str: string) {
    var hash = 3;
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
        this.weekArray[Math.floor((t.topicDay) / 5.1)].days[((t.topicDay - 1) % 5)].push(t)
        if (!this.tech.includes(t.topic.technology)) this.tech.push(t.topic.technology);
      });
    }).add(this.addTopics())
  }
  getCurriculum(routeParm: string) {
    this.curService.getCurriculumById(Number.parseInt(routeParm)).subscribe(data => {
      this.curriculum = data;
      this.title=this.curriculum.curriculumName;
    })

  }
}

