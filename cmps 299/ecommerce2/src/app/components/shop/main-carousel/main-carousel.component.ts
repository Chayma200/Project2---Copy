import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.sass']
})
export class MainCarouselComponent implements OnInit {


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['New Laptops', 'Headphones on Sale', 'New Outfits'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      },
      1500: {
        items: 1
      }
    },
    nav: true
  }


  @Input('slides') slides: Array<any> = [];
  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor() { }

  ngOnInit() {
  
  }


  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      initialSlide: 5,
      keyboard: true,
      navigation: false,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: true
      },
      speed: 500,
      effect: "slide"
    }
  }




}
