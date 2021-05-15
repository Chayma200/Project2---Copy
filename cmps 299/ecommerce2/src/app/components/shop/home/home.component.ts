import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuService } from '../../shared/sidebar/sidebar-menu.service';
import { ItemsService } from '../../pages/SharedServices/items.service';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../pages/register/register.service';
import { delay } from 'rxjs/operators';
import { BasketService } from '../../shared/services/basket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  p = "";
  pp = "";
  signedin: boolean = false;
  allitems: {};
  contentLoaded = false;
  public userID = "";
  constructor(private basketService: BasketService,private registerService: RegisterService, private http: HttpClient, private itemsservice: ItemsService, public router: Router, public sidenavMenuService: SidebarMenuService) { }


  ngOnInit() {
    this.registerService.getUserID().subscribe(data => { this.userID = data; console.log(this.userID); });
    this.itemsservice.getAllItems(-1, -1).subscribe(data => { this.allitems = data; console.log(this.allitems); });
    setTimeout(() => {
      this.contentLoaded = true;
    }, 3000);

    if (localStorage.getItem("token") != null) {
      this.signedin = true;
    }

    //this.getImagePath("b3f6b52f-707e-45cd-93e5-e40b96c3be5f");
   
  }

  async getImagePath(imageID: string) {
    //let galleryURL = "http://localhost:1264/";
    //return await (await this.http.get(`${galleryURL}api/ImagePath/GetImagePath/${imageID}`, { responseType: "text" }).toPromise()).toString();
    //data.toString();
    //this.pp = data;
    //console.log(data);
    //return this.pp;
  }

  public addToWishlist(item) {
    let itemID = item.itemID;
    this.itemsservice.addItemToWishList(itemID, this.userID).subscribe(data => {
      console.log(data)
      if (data === "Added to wish list") {
        alert("Item added to wish list!");
      }
      else if (data === "Item is already in the wishList") {
        alert("Item already exist in the wish list");
      }
    });
  }


  signin() {
    this.router.navigateByUrl("pages/login");
  }

  Register() {
    this.router.navigateByUrl("pages/register");
  }

  logout() {
    this.router.navigate(['pages/login'])
      .then(() => {
        window.location.reload();
      });
    localStorage.removeItem("token");
  }
}



