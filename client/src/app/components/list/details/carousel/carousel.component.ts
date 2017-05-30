import { ViewChild, ElementRef, AfterViewInit, Component, Input } from '@angular/core';
import * as $ from 'jquery';
import 'slick-carousel/slick/slick';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('carousel') carousel: ElementRef;
  @ViewChild('carouselNav') carouselNav: ElementRef;
  @Input() photos: string[];

  constructor() { }

  ngAfterViewInit() {
   // $(this.carousel.nativeElement).daterangepicker();
     $(this.carousel.nativeElement).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        dots:true,
        
        asNavFor: '#slider-nav'
      });
      $(this.carouselNav.nativeElement).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '#slider',
        dots: false,
        centerMode: true,
        focusOnSelect: true
      });
  }

}
