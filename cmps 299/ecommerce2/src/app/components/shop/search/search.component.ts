import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from '../../pages/register/register.service';
import { ItemsService } from '../../pages/SharedServices/items.service';
import { SearchService } from '../../pages/SharedServices/search.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  KeyWord: string;
  itemsfromsearch: Array<any> = new Array();
  userID: string;
  constructor(private searchSerice: SearchService, private route: ActivatedRoute, private registerService: RegisterService, private itemsservice: ItemsService) { }

  ngOnInit(): void {
    this.registerService.getUserID().subscribe(data => { this.userID = data; console.log(this.userID); });

    let keyword = this.route.snapshot.paramMap.get("KeyWord");
    this.KeyWord = keyword;
   
    this.searchSerice.Search(this.KeyWord).subscribe((data:Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.itemsfromsearch.push(data[i]);
      }
      console.log(this.itemsfromsearch);
    });
  }

  addToWishlist(item) {
    let itemID = item.item.itemID;
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


}
