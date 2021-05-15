import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../pages/SharedServices/items.service';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.sass']
})
export class CategoryItemsComponent implements OnInit {

  categoryID: number;
  allcategoryitems: {};
  constructor(private route: ActivatedRoute, private itemsService: ItemsService) { }

  ngOnInit(): void {
    let catID = parseInt(this.route.snapshot.paramMap.get("categoryID"));
    this.categoryID = catID;

    this.itemsService.getAllItems(this.categoryID, -1).subscribe(data => { this.allcategoryitems = data; console.log(this.allcategoryitems); });

  }

}
