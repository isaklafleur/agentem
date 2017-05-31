import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';

@Injectable()
export class ListingService {
  BASE_URL = environment.BASE_URL;
  listings: any[] = [];
  filter: any = {};
  limit = 20;
  offset = 0;
  isLoading = true;
  listingCount: number;
  addressComponents: string[] = [];
  zoom = 13;
  center: any = 'Rio de Janeiro, Brazil';
  detailsListing: any;
  loadSearchBounds: any;
  loadSearchPolygon: any;
  listHoverItem: number;
  onListingsLoaded$: EventEmitter<any>


  constructor( public http: Http, public userService: UserService ) {
    this.onListingsLoaded$ = new EventEmitter();
   }

  getList() {
    // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    // let options = new RequestOptions({ headers: headers });
    this.isLoading = true;

    this.http.get(`${this.BASE_URL}/api/listings${this.getQuery()}`)// , options)
      .map((res) => res.json()).subscribe((res) => {

          this.listings = this.listings.concat(res.listings);
          this.listingCount = res.count;
          this.isLoading = false;
          this.mapFavorites();

          this.onListingsLoaded$.emit(res.listings)
        });
  }

  getMore() {
    this.offset += this.limit;
    this.getList();
  }

  setSearchLoaded(search) {
    this.loadSearchBounds = search.bounds;
  }

  getNew() {
    this.offset = 0;
    this.listings = [];
    this.getList();
  }

  getUserListings() {
    return this.http.get(`${this.BASE_URL}/api/listings/${this.userService.user._id}`).map(res=>res.json());
  }

  deleteListing(listingId) {
    return this.http.delete(`${this.BASE_URL}/api/listings/${listingId}`).map(res=>res.json());
  }


  updateFilter() {
     this.getNew();
  }

  readSearchPlace(place) {
    this.addressComponents = [];
    this.filter.street = '';
    this.filter.neighbourhood = '';
    this.filter.city = '';
    this.filter.address = '';

    let newZoom = 13;
    place.address_components.forEach(component => {
      switch (component.types[0]) {
        case 'route':
          this.filter.street = component.long_name;
          newZoom = 15;
          this.addressComponents.unshift(component.long_name);
          break;
        case 'sublocality_level_1':
          this.filter.neighbourhood = component.long_name;
          this.addressComponents.unshift(component.long_name);
          newZoom = newZoom < 14 ? 14 : newZoom;
          break;
        case 'locality':
          this.filter.city = component.long_name;
          this.addressComponents.unshift(component.long_name);
          break;
      }
    })
    this.zoom = newZoom;
    this.center = place.geometry.location;
    // console.log('place.geometry.location: ', place.geometry.location);
  }

  mapFavorites() {
    if (this.userService.user) {
      this.userService.user.favorites.forEach(fav => {
        const favListing = this.listings.find(listing => listing._id === fav._id)
        if (favListing) favListing.isFavorite = true;
      })
    }
  }

  loadSearch(search) {
    this.filter = search;
    this.loadSearchBounds = search.bounds;
    this.addressComponents = [];
    if(search.city) this.addressComponents.push(search.city);
    if(search.neighbourhood) this.addressComponents.push(search.neighbourhood);
    if(search.street) this.addressComponents.push(search.street);

    if (search.polygon) {
      this.loadSearchPolygon = search.polygon;
    }
  }
  getQuery() {
    let query = `?limit=${this.limit}&offset=${this.offset}`;

    if(!_.isEmpty(this.filter))
      query += '&filter='+encodeURI(JSON.stringify(this.filter));

    return query;
  }
}
