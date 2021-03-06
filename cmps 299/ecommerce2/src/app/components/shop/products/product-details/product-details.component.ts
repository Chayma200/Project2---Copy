import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BasketService } from 'src/app/components/shared/services/basket.service';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { ProductDetailsService } from '../../../pages/SharedServices/product-details.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {
  itemID: string;
  itemDetails: {};
  itemSKUsDetails: Array<any> = new Array();
  itemSKUsTypes: Array<any> = new Array();
  itemSKUsValues: Array<any> = new Array();
  SKUsQuantities: Array<any> = new Array();
  vals: Array<any> = new Array();


  public config: SwiperConfigInterface={};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  public product            :   Product = {};
  public products           :   Product[] = [];

  public image: any;
  public zoomImage: any;

  public counter            :   number = 1;

  index: number;
  bigProductImageIndex = 0;

  constructor(private itemDetailsService: ProductDetailsService, private route: ActivatedRoute, public productsService: ProductService, public dialog: MatDialog, private router: Router, private BasketService: BasketService) {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.productsService.getProduct(id).subscribe(product => this.product = product)
    });

    let itemid = this.route.snapshot.paramMap.get("item-id");
    this.itemID = itemid;
    this.itemDetailsService.getItemMainDetails(this.itemID).subscribe(data => { this.itemDetails = data; console.log(this.itemDetails); });
    this.itemDetailsService.getItemSKUInfo(this.itemID).subscribe((data:Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.itemSKUsDetails.push(data[i]);
        this.SKUsQuantities.push(data[i].quantity);
        let skus = data[i].sku.split("/");
        console.log(skus);
        for (let j = 0; j < skus.length-1; j++) {
          let values = skus[j].split(":");
          this.itemSKUsTypes.push(values[0]);
          this.itemSKUsValues.push(values[1]);
          console.log(values[0]);
          console.log(values[1]);
        }
      }
      //filtering the types array to remove the duplicates
      this.itemSKUsTypes = this.itemSKUsTypes.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      for (let x = 0; x < this.itemSKUsTypes.length; x++) {
        let temp = new Array();
        //let a = x;
        //while (a < this.itemSKUsTypes.length) {
        //  temp.push(this.itemSKUsValues[a]);
        //  this.vals.push(temp);
        //}
        for (let a = x; a < this.itemSKUsDetails.length; a += this.itemSKUsTypes.length) {
          temp.push(this.itemSKUsValues[a]);
          this.vals.push(temp);
        }
      }
      console.log(this.vals);
      console.log(this.itemSKUsTypes);
      console.log(this.itemSKUsValues);
      console.log(this.SKUsQuantities);
      console.log(this.itemSKUsDetails);
    });
    
   }

  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);


    this.getRelatedProducts();
  }


  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
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
          slidesPerView: 3,
        },


      }
    }
  }


  public openProductDialog(product, bigProductImageIndex) {
    let dialogRef = this.dialog.open(ProductZoomComponent, {
      data: {product, index: bigProductImageIndex },
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }


  public selectImage(index) {
    console.log(this.product)
    console.log(index)
    this.bigProductImageIndex = index;
  }




public increment() {
  this.counter += 1;
}

public decrement() {
  if(this.counter >1){
     this.counter -= 1;
  }
}

getRelatedProducts() {
  this.productsService.getProducts()
  .subscribe(
    (product: Product[]) => {
      this.products = product
    });
}



 public onMouseMove(e){
  if(window.innerWidth >= 1280){
    var image, offsetX, offsetY, x, y, zoomer;
    image = e.currentTarget;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    x = offsetX/image.offsetWidth*100;
    y = offsetY/image.offsetHeight*100;
    zoomer = this.zoomViewer.nativeElement.children[0];
    if(zoomer){
      zoomer.style.backgroundPosition = x + '% ' + y + '%';
      zoomer.style.display = "block";
      zoomer.style.height = image.height + 'px';
      zoomer.style.width = image.width + 'px';
    }
  }
}

public onMouseLeave(event){
  this.zoomViewer.nativeElement.children[0].style.display = "none";
}

public openZoomViewer(){
  this.dialog.open(ProductZoomComponent, {
    data: this.zoomImage,
    panelClass: 'zoom-dialog'
  });
}



}


