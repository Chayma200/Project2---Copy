import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductDetailsService } from '../../../pages/SharedServices/product-details.service';
import { RegisterService } from '../../../pages/register/register.service';
import { ItemsService } from '../../../pages/SharedServices/items.service';
import { BasketService } from '../../../pages/SharedServices/basket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReviewsService } from '../../../pages/SharedServices/reviews.service';
import { HttpClient, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {

  @Output() public onUploadFinished = new EventEmitter();

  ratingStickers: Array<any> = new Array();
  userRating: number = 0;

  itemID: string;
  itemDetails: {};
  itemSKUDetails: Array<any> = new Array();
  alltypes: Array<any> = new Array();
  allvalues: Array<any> = new Array();
  skus: Array<any> = new Array();
  userID: string;
  public counter: number = 1;
  skuNames: Array<any> = new Array();
  quantities: Array<any> = new Array();
  skusids: Array<any> = new Array();
  SKU_ID: number;
  url: string;
  compareskuurl: string;
  comparemainurl: string;
  singleSkuInfo: Array<any> = new Array();
  itemRate: string;
  itemRateArray: Array<any> = new Array();
  errorupload: boolean = false;
  imagemessage: string;
  imageurl: string | ArrayBuffer;
  imageprogress: number;
  feedbackImageID: string;
  feedbackForm: FormGroup;
  allFeedbacks: Array<any> = new Array();

  public config: SwiperConfigInterface={};
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;
  public image: any;
  public zoomImage: any;
  index: number;
  bigProductImageIndex = 0;



  constructor(private http: HttpClient, private registerService: RegisterService, private basketService: BasketService, private itemService: ItemsService, private itemDetailsService: ProductDetailsService, private route: ActivatedRoute, public dialog: MatDialog, private router: Router, private productDetailsService: ProductDetailsService, private reviewsService: ReviewsService) { }

  ngOnInit() {

    this.ratingStickers = ["sentiment_very_dissatisfied", "sentiment_dissatisfied", "sentiment_neutral", "sentiment_satisfied", "sentiment_very_satisfied"];

    this.feedbackForm = new FormGroup({
      feedbackContent: new FormControl("", Validators.required)
    });

    this.url = this.router.url;
    console.log(this.url);

    let itemid = this.route.snapshot.paramMap.get("item-id");
    this.itemID = itemid;

    let skuid = parseInt(this.route.snapshot.paramMap.get("skU_ID"));
    this.SKU_ID = skuid;

    console.log(this.SKU_ID);

    this.compareskuurl = `/product/product-details/${this.itemID}/${this.SKU_ID.toString()}`;
    this.comparemainurl = `/home/product/product-details/${this.itemID}`;

    //get user id
    this.registerService.getUserID().subscribe(data => this.userID = data);

    //get the main item details
    this.itemDetailsService.getItemMainDetails(this.itemID).subscribe(data => { this.itemDetails = data; console.log(this.itemDetails); });

    //get the item sku details
    this.itemDetailsService.getItemSKUInfo(this.itemID).subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.itemSKUDetails.push(data[i]);
        this.skusids.push(data[i].sku.skU_ID);
        this.skuNames.push(data[i].sku.sku);
        this.quantities.push(data[i].sku.quantity);
      }
      console.log(this.skusids);
      console.log(this.skuNames);
      console.log(this.quantities);
    });

    //display types and values for the item
    this.itemService.getTypesValues(this.itemID).subscribe((data: Array<any>) => {
      for (let t = 0; t < data.length; t++) {
        this.alltypes.push(data[t].type.charType)
        this.allvalues.push(data[t].values);
      }
    });

    this.productDetailsService.getSingleSKUInfo(this.SKU_ID).subscribe((data: Array<any>) => {
      this.singleSkuInfo = data;
      console.log(this.singleSkuInfo);
    });

    //get the feedbacks on the items
    this.reviewsService.getItemFeedbacks(this.userID, this.itemID).subscribe((result:Array<any>) => this.allFeedbacks = result);

    //get the item average rate
    this.reviewsService.getItemAverageRate(this.itemID).subscribe((data: string) => {
      this.itemRate = data;
      console.log(this.itemRate);
      if (parseFloat(data) > 0 && parseFloat(data) < 1) {
        this.itemRateArray.push(1);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) > 1 && parseFloat(data) < 2) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(1);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) > 2 && parseFloat(data) < 3) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(1);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) > 3 && parseFloat(data) < 4) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(1);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) > 4 && parseFloat(data) < 5) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(1);
      }
      else if (parseFloat(data) == parseFloat("0")) {
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) == parseFloat("1")) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) == parseFloat("2")) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) == parseFloat("3")) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(0);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) == parseFloat("4")) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(0);
      }
      else if (parseFloat(data) == parseFloat("5")) {
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
        this.itemRateArray.push(2);
      }
    });
    
  }

  onChange(type, value, isChecked: boolean) {
    let itemtype = type;
    let itemvalue = value.charValue;
    if (isChecked) {
      this.skus.push(itemtype + ":" + itemvalue);
    }
    else {
      let d = itemtype + ":" + itemvalue;
      for (let x = 0; x < this.skus.length; x++) {
        if (this.skus[x] === d) {
          this.skus.splice(x, 1);
        }
      }
    }
  }

  giveRate(i) {
    console.log(i);
    for (let j = 0; j < i; j++) {
      document.getElementById("rate_" + j).style.color = "gold";
    }
    for (let x = i; x < 5; x++) {
      document.getElementById("rate_" + x).style.color = "black";
    }
    this.userRating = i;
    console.log(this.userRating);
  }

  deleteFeedback(feedback) {
    this.reviewsService.deleteFeedback(this.userID, feedback.feedback.feedbackID).subscribe(result => console.log(result));
    alert("You review is deleted!");
    window.location.reload();
  }


  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    if (!files[0] || files[0].length == 0) {
      this.errorupload = true;
      this.imagemessage = 'You must select an image';
      return;
    }

    var mimeType = files[0].type;
    console.log(mimeType);

    if (mimeType.match(/image\/*/) == null) {
      this.errorupload = true;
      this.imagemessage = "Only images are supported";
      return;
    }
    this.errorupload = false;
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imageurl = reader.result;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http.post('http://localhost:1264/api/Upload', formData, { responseType: "text", reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.imageprogress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.imagemessage = 'Upload success.';
          this.onUploadFinished.emit(event.body);
          this.feedbackImageID = event.body;
          console.log(this.feedbackImageID);
        }
      });
  }

  addToBasket() {
    console.log(this.skus);
    for (let x = 0; x < this.skuNames.length; x++) {
      let s = this.skuNames[x].split("/");
      console.log(s);
      let missing = this.skus.filter(item => s.indexOf(item) < 0);
      if (missing.length == 0) {
        if (this.compareskuurl == this.url) {
          if (this.counter <= this.singleSkuInfo[2]) {
            const data = {
              "user": this.userID,
              "SKUID": this.SKU_ID,
              "qte": this.counter
            }
            console.log(data);
            let addbasket = this.basketService.addToBasket(data);
            addbasket.then(value => {
              console.log(value);
              alert("Item added to basket!");
            });
            return;
          }
          else if (this.counter > this.singleSkuInfo[2]) {
            alert("The desired quantity is out of stock!");
            return;
          }
        }

        if (this.counter <= this.quantities[x]) {
          const data = {
            "user": this.userID,
            "SKUID": this.skusids[x],
            "qte": this.counter
          }
          console.log(data);
          let addbasket = this.basketService.addToBasket(data);
          addbasket.then(value => {
            console.log(value);
            alert("Item added to basket!");
          });
          return;
        }
        else if (this.counter > this.quantities[x]) {
          alert("The desired quantity is out of stock!");
          return;
        }
      }
    }
    alert("Item does not exist!");
  }


  selectSKU(image) {
    this.router.navigate(["product/product-details", image.sku.itemID, image.sku.skU_ID]).then(() => {
      window.location.reload();
    });
  }

  onSubmit() {
    const data = {
      "feedbackContent": this.feedbackForm.value.feedbackContent,
      "rate": this.userRating,
      "itemID": this.itemID,
      "userID": this.userID,
      "ImageID": this.feedbackImageID
    }
    console.log(data);
    if (this.feedbackForm.valid) {
      this.reviewsService.postFeedback(data).subscribe(result => console.log("Result: ", result), error => console.error("Error!", error));
      setTimeout(() => {
        window.location.reload(), 2000
      });
    }
  }


public increment() {
  this.counter += 1;
}

public decrement() {
  if(this.counter >1){
     this.counter -= 1;
  }
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

}


