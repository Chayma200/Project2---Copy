import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarMenuService } from '../../shared/sidebar/sidebar-menu.service';
import { SidenavMenu } from '../../shared/sidebar/sidebar-menu.model';
import { RegisterService } from '../../pages/register/register.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  public currency:any;
  public flags = [
    { name:'English', image: 'assets/images/flags/gb.svg' }
  ]
  public flag: any;
  signedin: boolean = false;
  public url : any;
  userID: string;

  constructor(private registerService: RegisterService, public router: Router, public sidenavMenuService: SidebarMenuService) {}

  ngOnInit() {
    this.currency = "USD";
    this.flag = this.flags[0];

    this.registerService.getUserID().subscribe(data => this.userID = data);

    if (localStorage.getItem("token") != null) {
      this.signedin = true;
    }
  }

  MyAccount() {
    this.router.navigateByUrl("pages/my-account");
  }

  goToMyOrders() {
    this.router.navigate(["pages/my-orders", this.userID]).then(() => {
      window.location.reload();
    });
  }


  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }

  goToWishList() {
    this.router.navigate(["pages/wishlist", this.userID]).then(() => {
      window.location.reload();
    });
  }

  goToBasket() {
    this.router.navigate(["pages/basket", this.userID]).then(() => {
      window.location.reload();
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
