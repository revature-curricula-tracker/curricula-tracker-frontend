import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-curricula-overview',
  templateUrl: './curricula-overview.component.html',
  styleUrls: ['./curricula-overview.component.css']
})
export class CurriculaOverviewComponent implements OnInit {
  calenderOptions:CalendarOptions = {
    initialView:'dayGridMonth'
  }
  title:string = "Curriculum Name";//name to be replaced by which curriculum it is
  tech: any[] = [];//array of tech for tech buttons
  topics : any[] = [];//array of topics and days they are on
  constructor() { }

  ngOnInit(): void {
  }

}
