import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { UserService } from '../../services/user.service';
import { MdDialog } from '@angular/material';
import { DetailsComponent } from './details/details.component'
declare var $:any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [  ]
})
export class ListComponent implements OnInit {
  @Input() populateOnInit: boolean;

  isEndResults: boolean = false;
  
  constructor(private listingService: ListingService, private userService:UserService, public dialog: MdDialog) { 
  }

  ngOnInit() {
    if(this.populateOnInit) {
      this.listingService.getNew();
    }
  }

  openDetails(i) {
    this.listingService.detailsIndex = i;
    const dialogRef = this.dialog.open(DetailsComponent, {width: '80%', height: '100%', position:"right"});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        console.log('form ok')
      }
    });
  }
 
  onScroll () {
    if(this.listingService.isLoading || this.isEndResults) return;
      this.listingService.getMore( (newListings)=>{
        if (newListings.length === 0) {
            this.isEndResults = true;
          }
      })
    }
  clickHeart($event, listing) {
    $event.stopPropagation();
    if(listing.isFavorite) {
      listing.isFavorite = false;
      this.userService.deleteFavorite(listing)
    } else {
      listing.isFavorite = true;
      this.userService.saveFavorite(listing)
    }
   // this.listingService.mapFavorites();
  }
}
