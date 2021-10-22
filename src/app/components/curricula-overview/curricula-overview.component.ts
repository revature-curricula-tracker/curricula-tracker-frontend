import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-curricula-overview',
  templateUrl: './curricula-overview.component.html',
  styleUrls: ['./curricula-overview.component.css']
})
export class CurriculaOverviewComponent implements OnInit {
  title:string = "Curriculum Name";//name to be replaced by which curriculum it is
  tech: any[] = [];//array of tech for tech buttons
  topics : any[] = [];//array of topics and days they are on
  constructor() { }

  ngOnInit(): void {
  }
  handleDateClick(arg: { dateStr: string; }) {
    //console.log('date click! ' + arg.dateStr)
  }
  counter(i: number) {
    return new Array(i);
  }
}
