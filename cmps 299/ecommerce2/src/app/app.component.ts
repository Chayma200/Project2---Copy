import { Component } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Ecommerce';
  public url : any;

  constructor(private spinner: NgxSpinnerService, public router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    } )
  }


  ngOnInit() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0,0)
  });
  document.documentElement.style.setProperty('--theme-deafult', '#0E1681');
  }

}
