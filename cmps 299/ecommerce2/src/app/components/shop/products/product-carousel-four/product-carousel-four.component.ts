import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import {  SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { BasketService } from 'src/app/components/shared/services/basket.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';

@Component({
  selector: 'app-product-carousel-four',
  templateUrl: './product-carousel-four.component.html',
  styleUrls: ['./product-carousel-four.component.sass']
})
export class ProductCarouselFourComponent implements OnInit {
  contentLoaded = false;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('product') product: Array<Product> = [];
  public config: SwiperConfigInterface = {};
  constructor(private dialog: MatDialog, private router: Router, private BasketService: BasketService, private productService: ProductService, private wishlistService: WishlistService) { }

  ngOnInit() {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);
  }
  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: true,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },


      }
    }
  }


  public openProductDialog(product){
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

   // Add to basket
  // public addToBasket(product: Product,  quantity: number = 1) {
  //  this.BasketService.addToBasket(product,quantity);
  //  console.log(product, quantity);
  //}

   // Add to wishlist
   public addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
 }

    // Add to compare
    public addToCompare(product: Product) {
      this.productService.addToCompare(product);
   }
}
