import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../../services/listing.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
  providers: [  ],
})

export class GoogleMapsComponent implements OnInit {

constructor(private listingService: ListingService ) { }

  ngOnInit() {
    
  }

}
