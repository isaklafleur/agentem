
import {Component, OnInit}   from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable}  from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-test',
  template: `<p>&nbsp;<p>&nbsp;<p>&nbsp;<p>&nbsp;<input type=text [value]="firstName" [formControl]="firstNameControl">
    <br>{{firstName}}
    <footer>Angular version: {{angularVersion}}</footer>`
})
export class TestComponent implements OnInit {
  angularVersion   = '2.0.0-rc.5';
  firstName        = 'Name';
  firstNameControl = new FormControl();
  constructor() { console.clear();  }
  ngOnInit() {
    // debounce keystroke events
    this.firstNameControl.valueChanges
      .debounceTime(1000)
      .subscribe(newValue => this.firstName = newValue);
    // throttle resize events
    Observable.fromEvent(window, 'resize')
      .throttleTime(200)
      .subscribe(e => {
        console.log('resize event', e);
        this.firstName += '*';
      });
  }
  ngDoCheck() { console.log('change detection'); }
} 