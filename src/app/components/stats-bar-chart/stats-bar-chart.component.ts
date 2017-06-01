import { Component, OnInit } from '@angular/core';
import { StatsService } from './../../services/stats.service'
import * as _ from 'lodash';

@Component({
  selector: 'app-stats-bar-chart',
  templateUrl: './stats-bar-chart.component.html',
  styleUrls: ['./stats-bar-chart.component.css']
})
export class StatsBarChartComponent implements OnInit {
  listingData: Object = {};
  single: any[] = [];
  multi: any[];
  sortedDataPoints: any[];
  dataPointsArray = [];

  // options
  view: number[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  padding = 1;
  showLegend = false;
  legendTitle = 'Average SQM Price by Street'
  showXAxisLabel = false;
  xAxisLabel = 'Street';
  showYAxisLabel = true;
  yAxisLabel = 'Price (R$) / m2';
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  autoScale = true;

  constructor(public statsService: StatsService) {

  }

  ngOnInit() {
    this.listingData = this.statsService.getStreetData().subscribe((res) => {
      const groupedByStreet = _.groupBy(res, listing => (listing as any).street);

      const averages = [];
      for (const key in groupedByStreet) {
        if (groupedByStreet.hasOwnProperty(key)) {
          averages.push({
            name: key,
            value: (groupedByStreet[key].reduce(
              (prev, listing) => prev + (listing as any).priceSqm, 0) as any) / groupedByStreet[key].length
          });
        }
      }
      this.dataPointsArray = this.filterOutliers(averages);
      Object.assign(this, {single: this.dataPointsArray});
    });
  }

  median(values) {
    const half = Math.floor(this.sortedDataPoints.length / 2);
    if (this.sortedDataPoints as any % 2) {
      return this.sortedDataPoints[half];
    } else {
      return (this.sortedDataPoints[half - 1] + this.sortedDataPoints[half]) / 2.0;
    }
  }

  filterOutliers(someArray) {
    const values = someArray.concat();

    values.sort( function(a, b) {
      return a.value - b.value;
    });

    const q1 = values[Math.floor((values.length / 4))].value;
    const q3 = values[Math.ceil((values.length * (3 / 4)))].value;
    const iqr = q3 - q1;

    const maxValue = q3 + iqr * 3;
    const minValue = q1 - iqr * 3;

    const filteredValues = values.filter(function(x) {
        return (x.value < maxValue) && (x.value > minValue);
    });

    return filteredValues;
  }
}
