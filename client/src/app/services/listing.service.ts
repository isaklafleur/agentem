import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingService {
  BASE_URL: string = 'http://localhost:3000/api/listings';
  listings: any[]=[];

  constructor( private http: Http ) { }
  getList(limit, offset, callback) {
    // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    // let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}?limit=${limit}&offset=${offset}`)//, options)
      .map((res) => res.json()).subscribe((listings) => {
          this.listings = this.listings.concat(listings);
          callback(listings);
        });;
  }

        
  get(id) {
    // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    // let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/${id}`)//, options)
      .map((res) => res.json());
  }
}
