import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../../services/listing.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  providers: [  ],
})

export class GoogleMapsComponent implements OnInit {
  lat1: number = 51.678418;
  lng1: number = 7.809007;
  lat2: number = 51.678428;
  lng2: number = 7.809017;
constructor(private listingService: ListingService ) { }

  ngOnInit() {
    setTimeout(()=>{
      console.log(this.listingService.listings);
    },2000)
    console.log("init MAPS<<<");
    
  }

}
