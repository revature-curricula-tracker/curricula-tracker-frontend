import { TopicsService } from './../../services/topics.service';
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
import { Color } from 'ng2-charts';
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
  topicsForCur: TopicsForCurriculum[] = [];
  topics: Topic[] = [];

  ////piechart variables
  public pieChartLabels:string[] = [];
  public pieChartData:number[] = [];
  public pieChartType:string = 'pie';
  public pieChartColors: Array < any > = [{
    backgroundColor: [],
    borderColor: []
 }];
  
  weekArray: Week[] = [];
  title = this.curriculum?.curriculumName || "No Curriculum Chosen"; //name to be replaced by which curriculum it is
  btnStyle = 'edit-btn-default';
  constructor(private curService: CurriculaService, private topicServ: TopicsService, private route: ActivatedRoute) {
    this.getCurriculum(this.route.snapshot.params['id']);
    this.curriculum = this.curriculum || new Curriculum(1, "No Curriculum Found", 5, 5 * 5, new Array<Topic>());
  }

  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = this.weekArray;
  ngOnInit(): void {
    this.getTopicData();
    
  }
  fillout() {
    for (let i = 1; i <= this.curriculum.numWeeks; i++) {
      this.weekArray.push(new Week(i));
    }
   
  }
  setWeeks() {
    for (let t of this.topicsForCur) {
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
    this.getChartdata();
  }
  drop(event: CdkDragDrop<TopicsForCurriculum[]>) {
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
          if (v.topicDay != newDropId+1) {
            console.log(`Updated ${oldDropId+1} to ${newDropId+1}`)
            v.topicDay = newDropId+1;
            this.curService.updateCurricula(v).subscribe(output=>console.log(`Updated ${v} to ${output}`))
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
    this.curService.getAllTopicsForCurriculum().subscribe(data => {
      data.forEach(t => {
        this.topicsForCur.push(t);
        this.weekArray[Math.floor((t.topicDay) / 5.1)].days[((t.topicDay - 1) % 5)].push(t)
        if (!this.tech.includes(t.topic.technology)) this.tech.push(t.topic.technology);
        if (!this.topics.includes(t.topic)) this.topics.push(t.topic);
      });
      this.getChartdata()
    }).add(this.fillout())
  }
  getCurriculum(routeParm: string) {
    this.curService.getCurriculumById(Number.parseInt(routeParm)).subscribe(data => {
      this.curriculum = data;
      this.title = this.curriculum.curriculumName;
    })

  }

  
  getChartdata()
  {
    let techCounter = new Map();
   for(var t of this.tech)
   {
     if(!this.pieChartLabels.includes(t.techName))
     {
       techCounter.set(t.techName , 1);
        this.pieChartLabels.push(t.techName );
        this.pieChartColors[0].backgroundColor.push(this.stringToColor(t.techName));
     }
     else
     {
      techCounter.set(t.techName , techCounter.get(t.techName) + 1);
     }
   }
   for(var i of techCounter)
   {
   this.pieChartData.push(i[1]);
   }
  }
 
  // piechart events
  public chartClicked(e:any):void {
    
  }
 
  public chartHovered(e:any):void {
    
  }

}

