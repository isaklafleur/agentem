import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MdDialog, MdDialogRef, MdInputModule } from '@angular/material';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  user = {
    username: '',
    password: ''
  };
  loading = false;

  error: string;

  signupDialog = false;
  loginDialog = true;

  constructor(
    public dialogRef: MdDialogRef<AuthComponent>,
    public dialog: MdDialog,
    private userservice: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.userservice.signup(this.user)
    .subscribe(result => {
      if (result === true) {
        // login successful
        console.log('result ok: ', result);
        this.dialogRef.close('Option 1');
        this.router.navigate(['/dashboard']);
      }
    }, (error) => {
      this.error =  JSON.parse(error._body).message;
    });
  }

  login() {
    this.userservice.login(this.user)
    .subscribe(result => {
      if (result === true) {
        // login successful
        this.dialogRef.close('Option 1');
        this.router.navigate(['/dashboard']);
      }
    }, (error) => {
      this.error = JSON.parse(error._body).message;
    });
  }

  DisplayLoginDialog() {
    this.signupDialog = false;
    this.loginDialog = true;
  }

  DisplaySignupDialog() {
    this.signupDialog = true;
    this.loginDialog = false;
  }

  submitForm(myForm) {
    // console.log(this.email);
  }
}
