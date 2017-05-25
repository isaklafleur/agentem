import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ListingService {
  BASE_URL = 'http://localhost:3000/api/listings';
  listings: any[] = [];
  filter: any = {};
  limit = 50;
  offset = 0;
  isLoading = true;

  constructor( private http: Http ) { }

  getQuery() {

    let query = `?limit=${this.limit}&offset=${this.offset}`;

    query += this.filter.maxPrice && !isNaN(this.filter.maxPrice) ? '&maxPrice=' + this.filter.maxPrice : '';
    query += this.filter.minPrice && !isNaN(this.filter.minPrice) ? '&minPrice=' + this.filter.minPrice : '';
    query += this.filter.bedrooms ? '&bedrooms=' + this.filter.bedrooms : '';
    query += this.filter.propertyType && this.filter.propertyType.house ? '&house=true' : '';
    query += this.filter.propertyType && this.filter.propertyType.apartment ? '&apartment=true' : '';
    query += this.filter.propertyType && this.filter.propertyType.villa ? '&villa=true' : '';
    query += this.filter.coordinates && this.filter.coordinates.latitude ? '&latitude=' + this.filter.coordinates.latitude : '';
    query += this.filter.coordinates && this.filter.coordinates.longitude ? '&longitude=' + this.filter.coordinates.longitude : '';
    query += this.filter.coordinates && this.filter.coordinates.latitude ? '&radius=' + this.filter.coordinates.radius : '';
    console.log(query);
    return query;
  }

  getList( callback) {
    // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    // let options = new RequestOptions({ headers: headers });
    this.isLoading = true;
    this.http.get(`${this.BASE_URL}${this.getQuery()}`)// , options)
      .map((res) => res.json()).subscribe((listings) => {
          this.listings = this.listings.concat(listings);
          this.isLoading = false;
          callback(listings);
        });
  }
  getMore(callback) {
    this.offset += this.limit;
    this.getList(callback);
  }

  getNew() {
    this.offset = 0;
    this.listings = [];
    this.getList(() => {});
  }

  get(id) {
    // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    // let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/${id}`)// , options)
      .map((res) => res.json());
  }
  // from filter
  updateFilter() {

    // if (!isNaN(this.filter.maxPrice) && !isNaN(this.filter.minPrice) && ( +this.filter.maxPrice < +this.filter.minPrice)) {
    //   return;
    // }
   // if ((this.filter.maxPrice && !isNaN(this.filter.maxPrice)) || (this.filter.minPrice && !isNaN(this.filter.minPrice)) ) {
      this.getNew();
   // }
  }
}
