import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartServiceService } from 'src/services/chart-service.service';
import HC_exporting from 'highcharts/modules/exporting';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
HC_exporting(Highcharts);

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css']
})
export class ColumnChartComponent implements OnInit {

  constructor(private chartService: ChartServiceService) { }
  public ColumnChartoptions: any = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Monthly Average Rainfall'
    },
    xAxis: {
      categories: [],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Rainfall (mm)'
      }
    },
    credits: {
      enabled: false
    },
    exporting: {
      buttons: {
        contextButton: {
          menuItems: ['downloadPNG', 'downloadJPEG', 'downloadPDF', 'downloadSVG', 'separator', 'downloadXLS', 'downloadCSV'],
        }
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0
      }
    },
    series: [{
      name: '',
      data: []

    }]
  }
  ngOnInit() {
    this.chartService.getChartData('bangalore').subscribe(data => {
      this.ColumnChartoptions.series[0].name = data.city;
      this.ColumnChartoptions.series[0].data = data.rainfallAverage;
      this.ColumnChartoptions.xAxis.categories = data.categories;
      Highcharts.chart('rainfallChart', this.ColumnChartoptions);
    })
  }

}
