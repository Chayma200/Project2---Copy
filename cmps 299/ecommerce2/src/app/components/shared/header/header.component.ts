import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { basketItem } from 'src/app/modals/basket-item';
import { BasketService } from '../services/basket.service';
import { SidebarMenuService } from '../sidebar/sidebar-menu.service';
import { AppSettings, Settings } from '../services/color-option.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '../../pages/SharedServices/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  SearchForm: FormGroup;
  itemsfromsearch: Array<any> = new Array();

  shoppingbasketItems: basketItem[] = [];
  public settings: Settings;

  constructor(private router: Router, private BasketService: BasketService, public appSettings: AppSettings) {
    this.settings = this.appSettings.settings;
    //this.BasketService.getItems().subscribe(shoppingbasketItems => this.shoppingbasketItems = shoppingbasketItems);
  }

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
