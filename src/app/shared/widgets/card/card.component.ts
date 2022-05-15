import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { MatCardModule } from '@angular/material';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() label: string;

  total : number;
  partial : number;
  partialPercentage : number;
  restPercentage : number;

  Highcharts = Highcharts;
  chartOptions = {};

  constructor() { }

  ngOnInit() {
    this.calculateRandomValues();
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Percentage of fullines'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: "Container Measurement",
        colorByPoint: true,
        data: [{
            name: 'Fulliness',
            y: this.partialPercentage,
            sliced: true,
            selected: true
        }, {
            name: 'Emptiness',
            y:this.restPercentage
        }]
      }]
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

  calculateRandomValues(){
    this.total = Math.floor(Math.random() * (1000));
    this.partial = Math.floor(Math.random() * (this.total));
    this.partialPercentage = (this.partial * 100) / this.total
    this.restPercentage = 100 - this.partialPercentage;
  }

}
