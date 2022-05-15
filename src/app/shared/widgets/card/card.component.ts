import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { MatCardModule } from '@angular/material';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import {catchError } from 'rxjs/operators';
import { error } from 'console';

interface ValuesToPost {
  total : number,
  partial : number,
  partialPercentage : number,
  restPercentage : number,
}

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {

  @Input() label: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };

  backEndURL : string


  valuesToPost : ValuesToPost = {
    total : 0,
    partial : 0,
    partialPercentage : 0,
    restPercentage : 0,
  };



  Highcharts = Highcharts;
  chartOptions = {};

  constructor(private http: HttpClient) { }

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
            y: this.valuesToPost.partialPercentage,
            sliced: true,
            selected: true
        }, {
            name: 'Emptiness',
            y:this.valuesToPost.restPercentage
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
    this.valuesToPost.total = Math.floor(Math.random() * (1000));
    this.valuesToPost.partial = Math.floor(Math.random() * (this.valuesToPost.total));
    this.valuesToPost.partialPercentage = (this.valuesToPost.partial * 100) / this.valuesToPost.total
    this.valuesToPost.restPercentage = 100 - this.valuesToPost.partialPercentage;
  }

  addValues(values : ValuesToPost): Observable<ValuesToPost> {
    return this.http.post<ValuesToPost>(this.backEndURL, this.valuesToPost, this.httpOptions)
  }
}
