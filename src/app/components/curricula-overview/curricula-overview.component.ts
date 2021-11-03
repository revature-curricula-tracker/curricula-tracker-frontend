import { Curriculum } from './../../model/curriculum';
import { TopicsService } from './../../services/topics.service';
import { ActivatedRoute } from '@angular/router';
import { Week } from './../../model/week';
import { Technology } from './../../model/technology';
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Topic } from 'src/app/model/topic';
import { CurriculumService } from 'src/app/services/curriculum.service';
import { faPencilAlt, faSquare, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateComponent } from '../dialog-create/dialog-create.component';
import { DialogData } from 'src/app/model/dialog';
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
  tech: Technology[] = [];//array of tech for tech buttons
  topics: Topic[] = [];

  testCurr: Curriculum = new Curriculum(1, "C", 10, 50, this.topics);
  testTech: Technology = new Technology(1, "Tech", "#000F", this.topics);
  testTopic: Topic = new Topic("Disc", 1, "Name", this.testTech, this.testCurr, 1);
  // testTopic: Topic = new Topic("Disc", 100, "Test", this.testTech, this.testCurr, 5);

  faEdit = faPencilAlt;
  faSquare = faSquare;
  faPlus = faPlus;
  faMinus = faMinus;

  techCounter = new Map<string, number>();
  weekCounter = 0;

  weekObj: any[] = [{
    selectedTech: [],
    weekId: 0
  }];
  dayObj: any[] = [];

  title = this.curriculum?.curriculumName || "New Curriculum";
  id: number = 0;
  curriculumId !: number;
  newDialogData: DialogData[] = [];
  newDialogData2: DialogData[] = [];
  weekArray: Week[] = [];

  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = new MatTableDataSource(this.weekArray);

  //piechart variables
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';
  public pieChartColors: Array<any> = [{
    backgroundColor: [],
    borderColor: []
  }];

  constructor(
    private curService: CurriculumService,
    private topicServ: TopicsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getCurriculum(this.route.snapshot.params['id']);
  }

  getCurriculum(routeParm: string) {
    this.curService.findById(Number.parseInt(routeParm)).subscribe(data => {
      this.curriculum = data;
      this.title = this.curriculum.curriculumName;
      this.curriculumId = this.curriculum.curriculumId;
      this.weekCounter = this.curriculum.numWeeks;
      for (let i = 1; i <= this.weekCounter; i++) {
        this.weekArray.push(new Week(i));
      }
      this.dataSource.data = this.weekArray;
      this.curriculum.topics.forEach(t => {
        this.getTopic(t.id);
      });
    })
  }

  getTopic(id: number) {
    this.topicServ.findById(id).subscribe(top => {

      this.topics.push(top);
      let week = Math.floor((top.topicDay) / 5.1);
      let dayofWeek = ((top.topicDay - 1) % 5);

      if (!this.weekArray[week].techs.includes(top.technology.techName))
        this.weekArray[week].techs.push(top.technology.techName);

      this.weekArray[week].days[dayofWeek].push(top);

      if (!this.tech.includes(top.technology))
        this.tech.push(top.technology);

      if (!this.topics.includes(top))
        this.topics.push(top);

      //piechartstuff
      if (!this.pieChartLabels.includes(top.technology.techName)) {
        this.techCounter.set(top.technology.techName, 1);
        this.pieChartLabels.push(top.technology.techName);
        this.pieChartColors[0].backgroundColor.push(this.stringToColor(top.technology.techName));
      }
      else {
        this.techCounter.set(top.technology.techName, (this.techCounter.get(top.technology.techName) || 0) + 1);
      }
      this.pieChartData = [];
      for (let i of this.techCounter) {
        this.pieChartData.push(i[1]);
      }
    })
  }

  addWeek() {
    console.log("Creating table")
    this.weekCounter++;
    this.weekArray.push(new Week(this.weekCounter));
    this.dataSource.data = this.weekArray; // this will show but the data won't persist
    console.log(`table week ${this.curriculum.numWeeks}`);
  }

  removeWeek() {
    console.log(`counter is ${this.weekCounter}`)
    if (this.weekCounter <= 1) {
      this.errorToastr("Cannot remove first week")
    }
    else {
      this.weekCounter--;
      this.weekArray.pop();
      this.dataSource.data = this.weekArray;
    }
  }

  public errorToastr(message: string) {
    this.toastr.error(message, "Deleting Failed");
  }
  openDialogWeek(input: String, id: number): void {
    console.log(`are you being clicked?`)
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '250px',
      data: { input: input, curriculumId: this.curriculumId, counter: id },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      for(let technology of result.selectedTech){
        if(!this.weekArray[result.weekId - 1].techs.includes(technology)){
          this.weekArray[result.weekId - 1].techs.push(technology);
        }
      }
    })
  }

  openDialogTopic(input: String, id: number, days: number, techs: any[]): void {
    const dialogRef = this.dialog.open(DialogCreateComponent, {
      width: '250px',
      data: { input: input, curriculumId: this.curriculumId, counter: id, days: days, weekObj: techs },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`result is ${JSON.stringify(result)}`);
      for(let topic of result.selectedTech) {
        if (!this.weekArray[result.weekId - 1].days[result.dayId].includes(topic)) {
          this.weekArray[result.weekId - 1].days[result.dayId].push(topic);
        }
      }
      // for (let values of this.dayObj) {
      //   if (values.dayId === result.weekId) {
      //     values.selectedTech = result.selectedTech;
      //     return;
      //   }
      // }
      // this.dayObj.push(result);
      // console.log(`dayObj is ${JSON.stringify(this.dayObj)}`);
    });
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
    // if (this.editing) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      //get where it was and where it is now
      let oldDropId = 0, newDropId = 0;
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
    // }
  }
}
