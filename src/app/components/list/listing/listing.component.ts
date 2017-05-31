import { Component, AfterViewInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ListingService } from '../../../services/listing.service';
import { UserService } from '../../../services/user.service';
import { DetailsComponent } from '../details/details.component';
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
  @Output() onDelete = new EventEmitter();
  @ViewChild('container') containerElement;

  constructor(public listingService: ListingService,
              public userService: UserService,
              public dialog: MdDialog,
              ) { }

  ngAfterViewInit() {
    // if(this.noStreatch)
    // $(this.containerElement.nativeElement).css("width", "205px");
  }

  openDetails() {
    this.listingService.detailsListing = this.listing; 
    const dialogRef = this.dialog.open(DetailsComponent, {width: '80%', height: '100%'});
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
