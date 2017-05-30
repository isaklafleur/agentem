import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MdTabsModule, MdInputModule, MdSelectModule, MdDialog } from '@angular/material';

import { PropertyFormComponent } from '../panel/property-form/property-form.component';
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

  constructor(public dialog: MdDialog,
    public userservice: UserService,
    public listingService: ListingService,
    public router: Router) { }

  openDialog() {
    const dialogRef = this.dialog.open(PropertyFormComponent, { width: '80%', height: '100%', position: 'right' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        console.log('form ok')
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
      })
    }
  }
  ngOnInit() {
    this.userProfile = this.userservice.getUser(this.userservice.activeUserId).subscribe((user) => {
      this.userProfile = user;
      this.userservice.user = this.userProfile;
      if (this.userservice.favoriteAfterLogin) {
        this.userservice.saveFavorite(this.userservice.favoriteAfterLogin)
      }
      if (this.userservice.searchAfterLogin) {
        this.userservice.saveSearch(this.userservice.searchAfterLogin)
      }
    });
  }

  deleteFavorite($event, listing) {
    $event.stopPropagation();
    this.userservice.deleteFavorite(listing);
  }

  deleteSavedSearch(time) {
    this.userservice.deleteSavedSearch(time);
  }

  openSearch(search) {
    this.listingService.loadSearch(search)
    this.router.navigate(['/search']);

  }

  openDetails(i) {
    this.listingService.detailsListing = this.userservice.user.favorites[i];
    const dialogRef = this.dialog.open(DetailsComponent, { width: '80%', height: '100%', position: 'right' });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        console.log('form ok')
      }
    });

  }
  formatPropertyTypes(propertyType) {
    let types = [];
    for (let k in propertyType) {
      types.push(k);
    }
    return types.join(',');
  }
}
