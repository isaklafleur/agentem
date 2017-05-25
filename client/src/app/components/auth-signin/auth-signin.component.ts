import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MdInputModule } from '@angular/material';


@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.css']
})
export class AuthSigninComponent implements OnInit {
  public email: string;
  public password: string;
  submitError: string;
  submittedInvalid = false;

  step1InputEmail = true;

  // "Signup Route - new email"
  step2InputNewPassword = false;
  step3SuccessSignUp = false;

  // "Login Route existing email"
  step2InputExistingPassword = false;
  step3SuccessLogin = false;

  constructor(public dialogRef: MdDialogRef<AuthSigninComponent>, public dialog: MdDialog) { }

  ngOnInit() {
  }

  submitForm(myForm) {
    // console.log(this.email);
  }
  doSubmitEmail() {
    // check if email is in the database

    // if email does not exist in the database
    // unhide second dialog and hide the first one
    this.step1InputEmail = false;
    this.step2InputNewPassword = true;

    // if email exist open unhide dialog to ask for password

  }
  doSubmitPassword() {
    // 
  }
}
