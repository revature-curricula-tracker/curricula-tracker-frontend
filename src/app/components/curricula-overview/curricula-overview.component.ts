import { Curriculum } from './../../model/curriculum';
import { TopicsService } from './../../services/topics.service';
import { ActivatedRoute } from '@angular/router';
import { Week } from './../../model/week';
import { Technology } from './../../model/technology';
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Topic } from 'src/app/model/topic';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { faPencilAlt, faSquare } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';

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
  topics: Topic[] = [];

  testCurr: Curriculum = new Curriculum(1, "C", 10, 50, this.topics);
  testTech: Technology = new Technology(1, "Tech", "#000F", this.topics);
  testTopic: Topic = new Topic("Disc", 100, "Test", this.testTech, this.testCurr, 5);
  techCounter = new Map<string, number>();
  faEdit = faPencilAlt;
  faSquare = faSquare;
  pieloaded = false;
  weekCounter=0;

  ////piechart variables
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  public pieChartColors: Array<any> = [{
    backgroundColor: [],
    borderColor: []
  }];
  weekArray: Week[] = [];
  title = this.curriculum?.curriculumName || "Unselected"; //name to be replaced by which curriculum it is
  btnStyle = 'edit-btn-default';
  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = new MatTableDataSource(this.weekArray);
  constructor(private curService: CurriculumService, private topicServ: TopicsService, private route: ActivatedRoute) {
    //this.curriculum = this.curriculum || new Curriculum(0, "No Curriculum Found", 10, 5 * 5, this.topics);
  }

  ngOnInit(): void {
    this.getCurriculum(this.route.snapshot.params['id']);
  }
  fillout() {
    for (let i = 1; i <= this.weekCounter; i++) {
      this.weekArray.push(new Week(i));
    }console.log(this.weekArray.length);
    this.dataSource.data=this.weekArray;
  }

  setWeeks() {
    for (let t of this.topics) {
      this.weekArray[Math.floor((t.topicDay) / 5.1)].days[((t.topicDay - 1) % 5)].push(t);
    }
  }
  startEdit() {
    if (!this.pieloaded) {
      this.finalChart();
      this.pieloaded = true
    }
    if (this.editing) {
      this.editing = false;
      this.btnStyle = 'edit-btn-default';
    }
    else {
      this.editing = true;
      this.btnStyle = 'edit-btn-change';
    }
  }

  counter(i: number): Array<number> {//create an array of n numbers
    return new Array(i);
  }

  public getTopicData(): any {
    console.log(this.curriculum);
    this.curriculum.topics.forEach(t => {
      this.getTopic(t.id);
    });

  }
  getCurriculum(routeParm: string) {
    this.curService.findById(Number.parseInt(routeParm)).subscribe(data => {
      this.curriculum = data;
      this.title = this.curriculum.curriculumName;
      this.weekCounter=this.curriculum.numWeeks;
      this.fillout();
      this.getTopicData();
    })
  }
  getTopic(id: number) {
    this.topicServ.findById(id).subscribe(top => {
      this.topics.push(top);
      let week = Math.floor((top.topicDay) / 5.1);
      let dayofWeek = ((top.topicDay - 1) % 5);
      if (!this.weekArray[week].techs.includes(top.technology.techName))this.weekArray[week].techs.push(top.technology.techName);
      this.weekArray[week].days[dayofWeek].push(top);
      if (!this.tech.includes(top.technology)) this.tech.push(top.technology);
      if (!this.topics.includes(top)) this.topics.push(top);
      this.getChartdata(top);
    })
  }

  getChartdata(t: Topic) {
    let name = t.technology.techName;
    if (!this.pieChartLabels.includes(name)) {
      this.techCounter.set(name, 1);
      this.pieChartLabels.push(name);
      this.pieChartColors[0].backgroundColor.push(this.stringToColor(name));
    }
    else {
      this.techCounter.set(t.technology.techName, (this.techCounter.get(name) || 0) + 1);
    }
  }

  finalChart() {
    for (let i of this.techCounter) {
      this.pieChartData.push(i[1]);
    }
  }
  // piechart events
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

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
  drop(event: CdkDragDrop<Topic[]>) {
    if (this.editing) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        let oldDropId = 0, newDropId = 0;//get where it was and where it is now
        oldDropId = parseInt(event.previousContainer.element.nativeElement.id.substr(14));
        newDropId = parseInt(event.container.element.nativeElement.id.substr(14));
        event.container.data.forEach(v => {
          if (v.topicDay != newDropId + 1) {
            console.log(`Updated ${oldDropId + 1} to ${newDropId + 1}`)
            v.topicDay = newDropId + 1;
            this.topicServ.updateTopic(v).subscribe(output => console.log(`Updated ${v} to ${output}`))
          }
        })
      }
    }
  }
}

