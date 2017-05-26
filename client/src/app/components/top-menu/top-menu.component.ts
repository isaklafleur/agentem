import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',

  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(public dialog: MdDialog, public auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

  openDialog() {
   const dialogRef = this.dialog.open(AuthComponent, {
     height: '400px',
     width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        console.log('form ok');
      }
    })
    // console.log('test');
  }
}
