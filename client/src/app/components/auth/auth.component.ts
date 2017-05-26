import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog, MdDialogRef, MdInputModule } from '@angular/material';
import { AuthService } from '../../services/auth.service';

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

  error: string;

  signupDialog = false;
  loginDialog = true;

  constructor(
    public dialogRef: MdDialogRef<AuthComponent>,
    public dialog: MdDialog,
    private session: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signup() {
    this.session.signup(this.user)
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
