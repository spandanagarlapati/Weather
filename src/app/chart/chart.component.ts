import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartServiceService } from 'src/services/chart-service.service';
import { ColumnChartComponent } from './column-chart/column-chart.component';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    constructor(private chartservice: ChartServiceService) { }
    @ViewChild(ColumnChartComponent, { static: false }) columnComponent: ColumnChartComponent;


    public options: any = {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Monthly Average Temperature'
        },
        xAxis: {
            categories: []
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: 'Temperature (°C)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: '',
            data: []
        }]
    }

    nameChange(event) {
        this.chartservice.getChartData(event).subscribe(data => {
            this.options.series[0].name = data.city;
            this.columnComponent.ColumnChartoptions.series[0].name = data.city;

            this.options.series[0].data = data.temperatureAverage;
            this.columnComponent.ColumnChartoptions.series[0].data = data.rainfallAverage;

            this.options.xAxis.categories = data.categories;
            this.columnComponent.ColumnChartoptions.xAxis.categories = data.categories;

            Highcharts.chart('temperatureChart', this.options);
            Highcharts.chart('rainfallChart', this.columnComponent.ColumnChartoptions);
        })
    }

    ngOnInit() {
        this.chartservice.getChartData('bangalore').subscribe(data => {
            this.options.series[0].name = data.city;
            this.options.series[0].data = data.temperatureAverage;
            this.options.xAxis.categories = data.categories;
            Highcharts.chart('temperatureChart', this.options);
        })
    }

}
