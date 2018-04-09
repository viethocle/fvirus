import { HomeService } from '@modules/home/home.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as moment from 'moment';

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
  day: any;
  week: any;
  month: any;
  Labels: any;
  Data: any;
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
        xAxes: [{
            barPercentage: 0.5
        }]
    }
  };
  public colors = [
    {
      backgroundColor: '#36A2EB',
      borderWidth: 2,
    }
  ];

  public barChartLabels: string[] = [];
  public barChartLabels1: string[] = [];
  public barChartLabels2: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [];
  public barChartData1: any[] = [];
  public barChartData2: any[] = [];

  constructor(
     private homeService: HomeService
  ) {}

  ngOnInit() {
    this.homeService.getRevenue()
    .subscribe(res => {
      this.day = res["0"].per_day;
      this.barChartLabels = this.day.map(day => moment(day.day).format('DD-MM'));
      this.barChartData = [
      {data: this.day.map(day => day.total), label: 'Doanh thu theo ngày'}
      ];

      this.week = res["1"].per_week;
      this.barChartLabels1 = this.week.map(week => moment(week.week).format('DD-MM'));
      this.barChartData1 = [
      {data: this.week.map(week => week.total), label: 'Doanh thu theo tuần'}
      ];

      this.month = res["2"].per_month;
      this.barChartLabels2 = this.month.map(month => moment(month.month).format('MM-YY') );
      this.barChartData2 = [
      {data: this.month.map(month => month.total), label: 'Doanh thu theo tháng'}
      ];
    });
  }
}
