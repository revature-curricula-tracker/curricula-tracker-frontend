import { Curriculum } from './../../model/curriculum';
import { TopicsService } from './../../services/topics.service';
import { ActivatedRoute } from '@angular/router';
import { Week } from './../../model/week';
import { Technology } from './../../model/technology';
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Topic } from 'src/app/model/topic';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

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

  testCurr:Curriculum = new Curriculum(1,"C",10,50,this.topics);
  testTech:Technology = new Technology(1,"Tech","#000F",this.topics);
  testTopic:Topic= new Topic("Disc",1,"Name",this.testTech,this.testCurr,1);

  faEdit = faPencilAlt;

  ////piechart variables
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  public pieChartColors: Array<any> = [{
    backgroundColor: [],
    borderColor: []
  }];

  weekArray: Week[] = [];
  title = this.curriculum?.curriculumName || "Java Enterprise"; //name to be replaced by which curriculum it is
  btnStyle = 'edit-btn-default';
  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = this.weekArray;

  constructor(private curService: CurriculumService, private topicServ: TopicsService, private route: ActivatedRoute) {
    this.getCurriculum(this.route.snapshot.params['id']);
    this.curriculum = this.curriculum || new Curriculum(1, "No Curriculum Found", 5, 5 * 5, this.topics);
  }

  ngOnInit(): void {
    this.topics.push(this.testTopic);
    this.getTopicData();

  }
  fillout() {
    for (let i = 1; i <= this.curriculum.numWeeks; i++) {
      this.weekArray.push(new Week(i));
    }

  }
  setWeeks() {
    for (let t of this.topics) {
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
            //this.topicServ.updateTopic(v);
          }
        })
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
    this.curriculum.topics.push(this.testTopic);
    console.log(this.curriculum);
    this.fillout();
    this.curriculum.topics.forEach(t => {
      this.topics.push(t);
      this.weekArray[Math.floor((t.topicDay) / 5.1)].days[((t.topicDay - 1) % 5)].push(t)
      if (!this.tech.includes(t.technology)) this.tech.push(t.technology);
      if (!this.topics.includes(t)) this.topics.push(t);
    });
    this.getChartdata();
    
  }
  getCurriculum(routeParm: string) {
    this.curService.findById(Number.parseInt(routeParm)).subscribe(data => {
      this.curriculum = data;
      this.title = this.curriculum.curriculumName;
    })
  }


  getChartdata() {
    let techCounter = new Map();
    for (var t of this.tech) {
      if (!this.pieChartLabels.includes(t.techName)) {
        techCounter.set(t.techName, 1);
        this.pieChartLabels.push(t.techName);
        this.pieChartColors[0].backgroundColor.push(this.stringToColor(t.techName));
      }
      else {
        techCounter.set(t.techName, techCounter.get(t.techName) + 1);
      }
    }
    for (var i of techCounter) {
      this.pieChartData.push(i[1]);
    }
  }

  // piechart events
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }

}

