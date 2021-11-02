import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { DialogData } from 'src/app/model/dialog';



@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit, OnChanges {


  @Input() item = new DialogData("", 0, [], 0, 0, []);


  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = this.item.name; // newDialogData2  ['Java', 'Python', 'Javascript', 'DevOps']
  // 100/length(3) = 33 = varible
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = false; // true
  public pieChartPlugins = [];


  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    // if (this.item) {
    //   for (let i = 0; i < this.pieChartLabels.length; i++) {
    //     let math = 100 / this.pieChartLabels.length; // 33
    //     this.pieChartData.push(math);
    //   }
    // }
  }

  ngOnChanges(changes: SimpleChanges) {
    // 
    // console.log(`item ${JSON.stringify(this.item)}`);
    // console.log(changes);
    // if ('nameOfInput' in changes) {
    //   console.log('YES!');
    //   console.log('Old value: ', changes.nameOfInput.previousValue);
    //   console.log('New value: ', changes.nameOfInput.currentValue);
    // }
    // else {
    //   console.log(`NO!`);
    // }
    // send the Input Decorator second time does not work
    if (this.item) {
      console.log("hello " + JSON.stringify(this.item));
      this.pieChartLabels.push(this.item.name);

      for (let i = 0; i < this.pieChartLabels.length; i++) {
        let math = 100 / this.pieChartLabels.length; // 33
        this.pieChartData.push(math);
      }
    }
    else {
      console.log(`NO`);
    }



  }

  calculating() {
    if (this.pieChartLabels.length) {
      for (let i = 0; i < this.pieChartLabels.length; i++) {
        let math = 100 / this.pieChartLabels.length; // 33
        this.pieChartData.push(math);
      }
    }
  }
}
