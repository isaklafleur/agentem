import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../../services/listing.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  listing: any;
  constructor(private listingService: ListingService) {
   }

  ngOnInit() {
    this.listing = this.listingService.listings[this.listingService.detailsIndex]
    console.log(this.listing)
  }

}
