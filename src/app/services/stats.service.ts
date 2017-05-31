import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class StatsService {
  filter: any = {};
  BASE_URL = environment.BASE_URL;

  constructor(public http: Http) { }

  getStreetData() {
    this.filter.neighbourhood = 'Copacabana';
    this.filter.city = 'Rio de Janeiro';
    const query = '?' + 'neighbourhood=' + this.filter.neighbourhood + '&city=' + this.filter.city;
    // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
    // let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.BASE_URL}/api/stats${query}`)// , options)
    .map((res) => res.json())
  }
}
