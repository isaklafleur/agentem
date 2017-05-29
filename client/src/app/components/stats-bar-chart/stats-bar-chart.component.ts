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
  single: any[];
  multi: any[];

/*  view: any[] = [800, ];*/

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
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
    Object.assign(this, { single, multi })
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    this.listingData = this.statsService.getStreetData().subscribe((res) => {
      // console.log('result', res);
      const groupedByStreet = _.groupBy(res, listing => (listing as any).street);
      // console.log(groupedByStreet['Avenida Atlântica']);
      console.log(groupedByStreet);
      let averages = [];
      for (var key in groupedByStreet) {
        averages.push({street:key, average: (groupedByStreet[key].reduce((prev, listing) => prev + (listing as any).priceSqm, 0) as any) / groupedByStreet[key].length});
      }
      console.log(averages);

      console.log(_.sortBy(averages, 'average'));
    });
  }
}

