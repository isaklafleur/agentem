import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListingService } from '../../../services/listing.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  providers: [  ],
})

export class GoogleMapsComponent implements OnInit {
  lat1 = 51.678418;
  lng1 = 7.809007;
  lat2 = 51.678428;
  lng2 = 7.809017;
  toThousand(x) {
    let addK = '';
    if (x > 9999) {
      x = (x / 1000).toFixed(1)
      addK = 'k';
    }
    return  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + addK;
  }

constructor(private listingService: ListingService ) { }

  ngOnInit() {
  }

}
