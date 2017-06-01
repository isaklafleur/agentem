import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MdTabsModule, MdInputModule, MdSelectModule, MdDialog } from '@angular/material';

import { PropertyFormComponent } from './property-form/property-form.component';
import { UserService } from '../../services/user.service';
import { ListingService } from '../../services/listing.service';
import { DetailsComponent } from '../list/details/details.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userProfile: any = {};
  submittedInvalid = false;
  submitError: string;
  submitSuccess: string;
  userListings: any[];

  constructor(public dialog: MdDialog,
    public userservice: UserService,
    public listingService: ListingService,
    public router: Router) { }

  openDialog() {
    const dialogRef = this.dialog.open(PropertyFormComponent, { width: '80%', height: '100%', position: 'right' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        this.getUserListings();
      }
    });
  }

  saveProfile(formValid) {
    if (!formValid) {
      this.submitError = 'Please fill out the form';
      this.submittedInvalid = true;
    } else {
      // console.log('myform', myForm);
      this.userservice.updateUser().subscribe(result => {
        if (result.error) {
          console.log('error:', result.err);
        } else {
          this.submitSuccess = 'Updates where stored successfully.'
        }
      });
    }
  }

  ngOnInit() {
    this.userProfile = this.userservice.getUser(this.userservice.activeUserId).subscribe((user) => {
      this.loadUser(user);
      this.doPreLogin();
      this.getUserListings();
    });
  }

  loadUser(user) {
    this.userProfile = user;
    this.userProfile.favorites.forEach(fav=>fav.isFavorite = true);
    this.userservice.user = this.userProfile;
  }
  
  doPreLogin() {
    if (this.userservice.favoriteAfterLogin) {
      this.userservice.saveFavorite(this.userservice.favoriteAfterLogin);
      delete this.userservice.favoriteAfterLogin;
    }
    if (this.userservice.searchAfterLogin) {
      this.userservice.saveSearch(this.userservice.searchAfterLogin);
      delete this.userservice.searchAfterLogin;
    }
  }

  getUserListings() {
    this.listingService.getUserListings().subscribe(listings => {
      this.userListings = listings.listings;
    });
  }

  deleteFavorite(listing) {
    this.userservice.deleteFavorite(listing);
  }

  deleteSavedSearch(time) {
    this.userservice.deleteSavedSearch(time);
  }

  openSearch(search) {
    this.listingService.loadSearch(search);
    this.router.navigate(['/search']);
  }

  deleteUserListing(listing) {
    this.listingService.deleteListing(listing._id).subscribe(res => {
      this.getUserListings();
    });
  }
}
