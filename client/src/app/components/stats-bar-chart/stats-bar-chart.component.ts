import { Component, OnInit } from '@angular/core';
import { single, multi } from './data';
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

/*  view: any[] = [800, ];*/

  // options
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

  // line, area
  autoScale = true;

  constructor(private statsService: StatsService) {

  }

  onSelect(event) {
    console.log(event);
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

    // Copy the values, rather than operating on references to existing values
    const values = someArray.concat();

    // Then sort
    values.sort( function(a, b) {
      return a.value - b.value;
    });

    /* Then find a generous IQR. This is generous because if (values.length / 4) 
     * is not an int, then really you should average the two elements on either 
     * side to find q1.
     */
    const q1 = values[Math.floor((values.length / 4))].value;
    // Likewise for q3.
    const q3 = values[Math.ceil((values.length * (3 / 4)))].value;
    const iqr = q3 - q1;

    // Then find min and max values
    const maxValue = q3 + iqr * 3; // * 1.5
    const minValue = q1 - iqr * 3; // * 1.5

    // Then filter anything beyond or beneath these values.
    const filteredValues = values.filter(function(x) {
        return (x.value < maxValue) && (x.value > minValue);
    });

    // Then return
    return filteredValues;
}

  ngOnInit() {
    this.listingData = this.statsService.getStreetData().subscribe((res) => {
      // console.log('result', res);
      const groupedByStreet = _.groupBy(res, listing => (listing as any).street);
      // console.log(groupedByStreet['Avenida Atlântica']);
      // console.log(groupedByStreet);
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
      // console.log(averages);
      // this.sortedDataPoints = _.sortBy(averages, 'value');

      // console.log(this.median(this.sortedDataPoints));
      // console.log(this.sortedDataPoints);
      // console.log(this.sortedDataPoints);
      Object.assign(this, {single: this.dataPointsArray});
    });
  }
}
