import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Kevin Bacon', 'Kiki', 'Mante', 'Chiliraptor'];
  public barChartType   = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [65,59,80,81] , label: '2019'},
    {data: [60,63,78,90] , label: '2020'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
