import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment'

@Injectable()
export class UserService implements CanActivate {
  user: any;
  public token: string;
  isAuth: EventEmitter<any> = new EventEmitter();
  activeUserId = '';
  favoriteAfterLogin: string;
  searchAfterLogin: any;
  public doSignIn$: EventEmitter<any>;
  BASE_URL = environment.BASE_URL;

  constructor(
    public router: Router,
    public http: Http
  ) {
      this.doSignIn$ = new EventEmitter();
      // set token if saved in local storage
     //  this.token = localStorage.getItem('token');
     localStorage.removeItem('token');
     this.isAuth.emit(false);
      // if (this.token != null) {
      //   this.isAuth.emit(true);
      // } else {
      //   this.isAuth.emit(false);
      // }
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('token')) {
      // logged in so return true\
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/']);
    this.isAuth.emit(false);
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
      if (token) {
        // set token property
        this.token = token;

        // store username and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('token', token);
        this.isAuth.emit(true);
        this.user = response.user;
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
      this.router.navigate(['/']);
  }

  getOptions() {
    let headers = new Headers({ 'Authorization': 'JWT ' + this.token });
    return new RequestOptions({ headers: headers });
  }

  getUser(id) {
    return this.http.get(`${this.BASE_URL}/api/users/${id}`, this.getOptions())
      .map((res) => res.json());
  }

  updateUser() {
    return this.http.post(`${this.BASE_URL}/api/users/${this.user._id}`, this.user, this.getOptions())
      .map((res) => res.json());
  }

  saveFavorite(listing) {
    if (!this.user) {
      this.favoriteAfterLogin = listing;
      this.doSignIn$.emit(true);
    } else {
    this.user.favorites.push(listing);
      this.http.put(`${this.BASE_URL}/api/users/${this.user._id}/favorite/${listing._id}`, true, this.getOptions())
        .map((res) => res.json()).subscribe(res => {
          // console.log('Favorite saved');
        })
    }
  }

  deleteFavorite(listing) {
    this.user.favorites = this.user.favorites.filter(fav => fav._id !== listing._id);
    this.http.delete(`${this.BASE_URL}/api/users/${this.user._id}/favorite/${listing._id}`, this.getOptions())
      .map((res) => res.json()).subscribe(res => {
        // console.log('Favorite deleted');
      })
  }

  saveSearch(search) {
    search.time = Date.now()
    if (!this.user) {
      this.searchAfterLogin = search;
      this.doSignIn$.emit(true);
    } else {
      this.user.savedSearches.push(search);

      this.http.put(`${this.BASE_URL}/api/users/${this.user._id}/search`, {search}, this.getOptions())
        .map(res => res.json()).subscribe(res => {
        })
    }
  }

  deleteSavedSearch(time) {
    this.user.savedSearches = this.user.savedSearches.filter(ss => ss.time !== time);
    this.http.delete(`${this.BASE_URL}/api/users/${this.user._id}/search/${time}`, this.getOptions())
      .map(res => res.json()).subscribe(res => {
        // console.log('Saved search deleted');
      })
  }
}
