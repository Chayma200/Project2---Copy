import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  SearchForm: FormGroup;
  itemsfromsearch: Array<any> = new Array();
  constructor(private router: Router) { }

  ngOnInit() {
    this.SearchForm = new FormGroup({
      KeyWord: new FormControl("")
    });
  }

  onSubmit() {

    if (this.SearchForm.valid) {
      let KeyWord = this.SearchForm.value.KeyWord;
      this.router.navigate(["pages/search", KeyWord]).then(() => {
        window.location.reload();
      });
    }
  }

}
