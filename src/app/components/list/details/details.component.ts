import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../../services/listing.service';
import { UserService } from '../../../services/user.service';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  listing: any;

  constructor(public listingService: ListingService, 
              public dialogRef: MdDialogRef<DetailsComponent>,
              public userService: UserService) {
      this.userService.doSignIn$.subscribe(()=>{
        this.dialogRef.close();
      })
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
