import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef } from '@angular/material';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.css']
})
export class AuthSigninComponent implements OnInit {
  newUser = {
    username: '',
    password: ''
  };

  user: any;
  error: string;

  signupDialog = true;
  loginDialog = false;

  constructor(
    public dialogRef: MdDialogRef<AuthSigninComponent>,
    public dialog: MdDialog,
    private session: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.session.signup(this.newUser)
    .subscribe(result => {
      if (result === true) {
        // login successful
        console.log('result ok: ', result);
        this.router.navigate(['/dashboard']);
      } else {
        console.log('result not ok: ', result);
      }
    });
  }
  login() {
    this.session.login(this.user)
    .subscribe(result => {
      if (result === true) {
        // login successful
        this.router.navigate(['/dashboard']);
      } else {
        // login failed
        this.error = 'Username or password is incorrect';
      }
    });
  }

  submitForm(myForm) {
    // console.log(this.email);
  }
}
