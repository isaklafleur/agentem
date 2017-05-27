import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  BASE_URL = 'http://localhost:3000/api/listings';
  constructor(private http: Http) { }

  getUser() {
    //
  }

}
