import { Component, OnInit } from '@angular/core';
export interface TopicElement {
  week : string;
  day1: string;
  day2: string;
  day3: string;
  day4: string;
  day5: string;
}
const TOPIC_DATA: any[] = [
  { week: `week 1: Java`, day1: `Java Basics`, day2:`Java POJOs`, day3: `Even More Java` , day4: `Less Java` , day5: `Beans` },
  { week: `week 2: JavaScript`,day1: `JavaScript Basics`, day2:`JavaScript`, day3: `Even More JavaScript` , day4: `Less JavaScript` , day5: `JavaScript Beans` },
];//array of topics and days they are on

@Component({
  selector: 'app-curricula-overview',
  templateUrl: './curricula-overview.component.html',
  styleUrls: ['./curricula-overview.component.css']
})
export class CurriculaOverviewComponent implements OnInit {
  title: string = "Curriculum Name";//name to be replaced by which curriculum it is
  tech: any[] = [];//array of tech for tech buttons
  constructor() { }
  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3','day4','day5'];
  dataSource = TOPIC_DATA;
  
  ngOnInit(): void {
  }
  counter(i: number) {//create an array of n numbers
    return new Array(i);
  }
}
