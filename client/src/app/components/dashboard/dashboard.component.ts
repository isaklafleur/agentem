import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdTabsModule, MdInputModule, MdSelectModule, MdDialog } from '@angular/material';
import { PropertyFormComponent } from '../panel/property-form/property-form.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userProfile = {};
  submittedInvalid = false;
  submitError: string;
  submitSuccess: string;

  constructor(public dialog: MdDialog, private userservice: UserService) { }

  openDialog() {
    const dialogRef = this.dialog.open(PropertyFormComponent, {width: '80%', height: '100%', position: 'right'});
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
        if(this.userservice.favoriteAfterLogin)
          this.userservice.saveFavorite(this.userservice.favoriteAfterLogin)
      });
    // console.log('userProfile: ', this.userProfile)
  }

  deleteFavorite($event, listing) {
    $event.stopPropagation();
    this.userservice.deleteFavorite(listing);
  }
}
