import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../../services/listing.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  listing: any;

  constructor(public listingService: ListingService, 
              public userService: UserService) {
   }

  ngOnInit() {
    this.listing = this.listingService.detailsListing;
  }

  toggleFavorite() {
    if(this.listing.isFavorite) {
      this.userService.deleteFavorite(this.listing);
      this.listing.isFavorite = false;
    } else {
      this.userService.saveFavorite(this.listing);
    } 
  } 
}
