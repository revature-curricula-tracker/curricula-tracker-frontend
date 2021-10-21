import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-curricula-overview',
  templateUrl: './curricula-overview.component.html',
  styleUrls: ['./curricula-overview.component.css']
})
export class CurriculaOverviewComponent implements OnInit {
  calendarOptions:CalendarOptions = {
    initialView:'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: 'event 1', date: '2021-10-04' ,backgroundColor:'green'},
      { title: 'event 2', date: '2021-10-02' ,editable:true},
      { title: 'event 2', date: '2021-10-02'  ,editable:true ,durationEditable:true},
      { title: 'event 2', date: '2021-10-02' ,end:'2021-10-10'},
      { title: 'event 2', date: '2021-10-02' ,interactive:true},
      { title: 'event 4', date: '2021-10-22'}
    ]
  }
  title:string = "Curriculum Name";//name to be replaced by which curriculum it is
  tech: any[] = [];//array of tech for tech buttons
  topics : any[] = [];//array of topics and days they are on
  constructor() { }

  ngOnInit(): void {
  }
  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr)
  }

}
