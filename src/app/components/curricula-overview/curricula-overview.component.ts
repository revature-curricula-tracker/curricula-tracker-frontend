import { TopicsForCurriculum } from './../../model/topicsForCurriculum';
import { Technology } from './../../model/technology';
import { Topic } from './../../model/topic';
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
export interface TopicElement {

}
@Component({
  selector: 'app-curricula-overview',
  templateUrl: './curricula-overview.component.html',
  styleUrls: ['./curricula-overview.component.css']
})
export class CurriculaOverviewComponent implements OnInit {
  title: string = "Curriculum Name";//name to be replaced by which curriculum it is
  tech: Technology[] = [];//array of tech for tech buttons
  topics: TopicsForCurriculum[] = [new TopicsForCurriculum(1,1,1),new TopicsForCurriculum(1,1,1)];
  upperT: any[][] = [["w", 1], ["asdvad", 4], ["gbredsdw", 5]]
  TOPIC_DATA: any[] = [
   { week: [`week 1`], day1: [`Java Basics`], day2: [`Java POJOs`], day3: [`Even More Java`], day4: [`Less Java`], day5: [`Beans`] },
   { week: [`week 2`], day1: [`JavaScript \n Basics`], day2: [`JavaScript`], day3: [`Even More JavaScript`], day4: [`Less JavaScript`], day5: [`JavaScript Beans`] },
  ];//array of topics and days they are on
  constructor() {}
  displayedColumns: string[] = ['week', 'day1', 'day2', 'day3', 'day4', 'day5'];
  dataSource = this.TOPIC_DATA;

  ngOnInit(): void {
    this.setAll();
  }
  counter(i: number) {//create an array of n numbers
    return new Array(i);
  }
  setAll(): void {
    this.topics.forEach(element => {
      console.log(element);
      element.topic_day;
      this.TOPIC_DATA=this.TOPIC_DATA.concat({ week: [`week 3`], day1: [`JavaScript Basics`], day2: [`JavaScript`], day3: [`Even More JavaScript`], day4: [`Less JavaScript`], day5: [`JavaScript Beans`] })
       console.log(this.TOPIC_DATA);})
    
  };
}

