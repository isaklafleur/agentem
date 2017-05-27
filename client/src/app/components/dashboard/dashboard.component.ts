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
  user = {};
  userProfile = this.userservice.getUser(this.userservice.activeUserId);

  constructor(public dialog: MdDialog, private userservice: UserService) { }

  openDialog() {
    const dialogRef = this.dialog.open(PropertyFormComponent, {width: '80%', height: '100%', position: 'right'});
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        console.log('form ok')
      }
    });
  }

  saveProfile(myForm) {
    console.log('myform', myForm);
    console.log('this.userservice.activeUserId', this.userservice.activeUserId);
    console.log('user from dashboard: ', this.userProfile);
    console.log('test');
    console.log('userprofile', this.userservice.user);
  }

  ngOnInit() {
  }
}
