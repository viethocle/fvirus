import { HomeService } from './../../home.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css']
})
export class StatisticalComponent implements OnInit {
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
  public colors1 = [
    {
      backgroundColor: '#00FF00',
      borderWidth: 2,
    }
  ];
  public colors2 = [
    {
      backgroundColor: '#FF3300',
      borderWidth: 2,
    }
  ];
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {data: [65, 34, 80, 81, 56, 55, 40], label: 'Doanh thu theo ngày'}
  ]

  public barChartData1: any[] = [
    {data: [65, 59, 80, 81, 56, 33, 40], label: 'Doanh thu theo tuần'}
  ];

  public barChartData2: any[] = [
    {data: [24, 51, 45, 81, 56, 56, 40], label: 'Doanh thu theo tháng'}
  ];


  constructor(
     private homeService: HomeService
  ) {}

  ngOnInit() {
  }

}
