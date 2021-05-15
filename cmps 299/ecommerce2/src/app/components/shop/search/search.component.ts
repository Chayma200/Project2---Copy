import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../pages/SharedServices/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  KeyWord: string;
  itemsfromsearch: Array<any> = new Array();
  constructor(private searchSerice: SearchService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let keyword = this.route.snapshot.paramMap.get("KeyWord");
    this.KeyWord = keyword;
   
    this.searchSerice.Search(this.KeyWord).subscribe((data:Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.itemsfromsearch.push(data[i]);
      }
      console.log(this.itemsfromsearch);
    });
  }



}
