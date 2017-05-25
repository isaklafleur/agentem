import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import { AuthSigninComponent } from '../auth-signin/auth-signin.component';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',

  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(public dialog: MdDialog) { }


  ngOnInit() {
  }

  openDialog() {
   const dialogRef = this.dialog.open(AuthSigninComponent, {
     height: '400px',
     width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'submitted') {
        console.log('form ok');
      }
    })
    // console.log('test');
  }
}
