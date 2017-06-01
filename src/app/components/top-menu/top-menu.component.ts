import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  isAuth = this.userservice.token;
  constructor(public dialog: MdDialog, public userservice: UserService) {
    this.userservice.doSignIn$.subscribe(item => this.openDialog());
  }

  ngOnInit() {
  }

  logout() {
    this.userservice.logout();
  }

  openDialog() {
    this.dialog.open(AuthComponent, { height: '400px', width: '500px' });
  }
}
