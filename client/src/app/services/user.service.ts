import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserService implements CanActivate {
  user: any;
  public token: string;
  isAuth: EventEmitter<any> = new EventEmitter();
  activeUserId = '';
  favoriteAfterLogin: string;
  public doSignIn$: EventEmitter<any>; 
  BASE_URL = 'http://localhost:3000';

  constructor(
    private router: Router,
    private http: Http
  ) {
      this.doSignIn$ = new EventEmitter();
      // set token if saved in local storage
      this.token = localStorage.getItem('token');
      if (this.token != null) {
        this.isAuth.emit(true);
      } else {
        this.isAuth.emit(false);
      }
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true\
/*      this.token = localStorage.getItem('token');
      this.isAuth = true;*/
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/']);
    this.isAuth.emit(true);
    return false;
  }

  isAuthenticated() {
    return this.token != null ? true : false;
  }

  signup(user) {
    return this.http.post(`${this.BASE_URL}/signup`, user)
    .map((response) => response.json())
    .map((response) => {
      const token = response.token;
/*      const user = response.user;*/
      if (token) {
        // set token property
        this.token = token;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token);
        this.isAuth.emit(true);
        // return true to indicate successful login
        return true;
      } else {
        // return false to indicate failed login
        return false;
      }
    })
    .catch((err) => Observable.throw(err));
  }

  login(user) {
    return this.http.post(`${this.BASE_URL}/login`, user)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            const token = response.json() && response.json().token;
            this.activeUserId = response.json() && response.json().payload.id;

            if (token) {
              // set token property
              this.token = token;
              this.isAuth.emit(true);
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('token', token);

/*              localStorage.setItem('user', JSON.stringify(user) );*/
              // return true to indicate successful login
              return true;
            } else {
              // return false to indicate failed login
              return false;
            }
        });
  }

  logout() {
      // clear token remove user from local storage to log user out
      this.token = null;
      this.activeUserId = null;
      this.isAuth.emit(false);
      localStorage.removeItem('token');
/*      localStorage.removeItem('user');*/
      this.router.navigate(['/']);
  }

  getUser(id) {
/*    let headers = new Headers({ 'Authorization': 'JWT ' + this.userservice.token });
    let options = new RequestOptions({ headers: headers });*/
    return this.http.get(`${this.BASE_URL}/api/users/${id}`/*, options*/)
      .map((res) => res.json());
  }
  updateUser() {
    /* let headers = new Headers({ 'Authorization': 'JWT ' + this.userservice.token });
    let options = new RequestOptions({ headers: headers });*/
    return this.http.post(`${this.BASE_URL}/api/users/${this.user._id}`, this.user/*, options*/)
      .map((res) => res.json());
  }
  saveFavorite(listing) {
    if(!this.user) {
      this.favoriteAfterLogin = listing;
      this.doSignIn$.emit(true);
    } else {
    this.user.favorites.push(listing);
      this.http.put(`${this.BASE_URL}/api/users/${this.user._id}/favorite/${listing._id}`, true)
        .map((res) => res.json()).subscribe(res=>{
          console.log("Favorite saved");
        })
    }
  }
  deleteFavorite(listing) {
    this.user.favorites = this.user.favorites.filter(fav=>fav._id!==listing._id);
    this.http.delete(`${this.BASE_URL}/api/users/${this.user._id}/favorite/${listing._id}`)
      .map((res) => res.json()).subscribe(res=>{
        console.log("Favorite deleted");
      })
  }
}
