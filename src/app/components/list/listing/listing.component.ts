import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { ListingService } from '../../../services/listing.service';
import { UserService } from '../../../services/user.service';
import { DetailsModalComponent } from '../details-modal/details-modal.component';
declare var $: any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements AfterViewInit {
  @Input() listing: any;
  @Input() index: number;
  @Input() hasFavorite: boolean;
  @Input() hasDelete: boolean;
  @Input() fixedWidth: boolean;
  @Input() zIndex: boolean;
  @Input() isUserListing: boolean;
  @Output() onDelete = new EventEmitter();
  @ViewChild('container') containerElement;

  constructor(public listingService: ListingService,
              public userService: UserService,
              public dialog: MdDialog,
              public router: Router
              ) { }

  ngAfterViewInit() {
  }

  openDetails() {
    this.listingService.detailsListing = this.listing; 
    if (document.documentElement.clientWidth < 900) {
      this.router.navigate(['/details']);
    } else {
      const dialogRef = this.dialog.open(DetailsModalComponent, {width: '80%', height: '100%'});
    }
  }
  
  clickFavorite($event) {
    $event.stopPropagation();
    if (this.listing.isFavorite) {
      this.listing.isFavorite = false;
      this.userService.deleteFavorite(this.listing)
    } else {
      this.listing.isFavorite = true;
      this.userService.saveFavorite(this.listing)
    }
  }

  clickDelete($event) {
    $event.stopPropagation();
    this.onDelete.emit(this.listing);
  }

  setHoverIndex() {
    this.listingService.listHoverItem = this.index;
  }

  removeHoverIndex() {
    this.listingService.listHoverItem = -1;
  }
}
