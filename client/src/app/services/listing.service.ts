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
  listingCount: number;
  addressComponents: string[] = [];
  zoom: number = 13;
  center: any = "Rio de Janeiro, Brazil";

  constructor( private http: Http ) { }

  getQuery() {
    // console.log(this.filter);

    let query = `?limit=${this.limit}&offset=${this.offset}`;

    query += this.filter.typesBRN ? '&typesBRN=' + this.filter.typesBRN : '';
    query += this.filter.maxPrice && !isNaN(this.filter.maxPrice) ? '&maxPrice=' + this.filter.maxPrice : '';
    query += this.filter.minPrice && !isNaN(this.filter.minPrice) ? '&minPrice=' + this.filter.minPrice : '';
    query += this.filter.bedrooms ? '&bedrooms=' + this.filter.bedrooms : '';

    query += this.filter.street ? '&street=' + this.filter.street : '';
    query += this.filter.neighbourhood ? '&neighbourhood=' + this.filter.neighbourhood : '';
    query += this.filter.city ? '&city=' + this.filter.city : '';

    query += this.filter.propertyType && this.filter.propertyType.house ? '&house=true' : '';
    query += this.filter.propertyType && this.filter.propertyType.apartment ? '&apartment=true' : '';
    query += this.filter.propertyType && this.filter.propertyType.villa ? '&villa=true' : '';
 //   query += this.filter.coordinates && this.filter.coordinates.latitude ? '&latitude=' + this.filter.coordinates.latitude : '';
 //   query += this.filter.coordinates && this.filter.coordinates.longitude ? '&longitude=' + this.filter.coordinates.longitude : '';
  //  query += this.filter.coordinates && this.filter.coordinates.latitude ? '&radius=' + this.filter.coordinates.radius : '';
    if(this.filter.bounds) {
      query += "&bounds=" + encodeURI(JSON.stringify(this.filter.bounds));
    }

    if(this.filter.polygon) {
      query += "&polygon=" + encodeURI(JSON.stringify(this.filter.polygon));
    }

    console.log(query);
    return query;
  }

  getList( callback) {
    // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    // let options = new RequestOptions({ headers: headers });
    this.isLoading = true;
    this.http.get(`${this.BASE_URL}${this.getQuery()}`)// , options)
      .map((res) => res.json()).subscribe((res) => {
          this.listings = this.listings.concat(res.listings);
          this.listingCount = res.count;
          this.isLoading = false;
          callback(res.listings);
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

  readSearchPlace(place) {
    this.addressComponents = [];
    this.filter.street = "";
    this.filter.neighbourhood = "";
    this.filter.city = "";
    let newZoom = 13;
    place.address_components.forEach(component=>{
      switch(component.types[0]) {
        case "route": 
          this.filter.street = component.long_name; 
          newZoom = 15;
          this.addressComponents.unshift(component.long_name); 
          break;
        case "sublocality_level_1": 
          this.filter.neighbourhood = component.long_name; 
          this.addressComponents.unshift(component.long_name);
          newZoom = newZoom<14 ? 14 : newZoom;
          break;
        case "locality": 
          this.filter.city = component.long_name; 
          this.addressComponents.unshift(component.long_name);
          break;
      }
    })
    this.zoom = newZoom;
    this.center = place.geometry.location;
  }
}
