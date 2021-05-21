import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.sass']
})
export class ErrorPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome() {
    this.router.navigate(["/home"]).then(() => {
      window.location.reload();
    })
  }
}
