import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonalInventoryService } from './personal-inventory.service';


@Component({
  selector: 'app-personal-inventory',
  templateUrl: './personal-inventory.component.html',
  styleUrls: ['./personal-inventory.component.sass']
})
export class PersonalInventoryComponent implements OnInit {

  allitems: Array<any> = new Array();
  companyName: string;
  constructor(private route: ActivatedRoute, private perInService: PersonalInventoryService) { }

  ngOnInit() {
    let companyname = this.route.snapshot.paramMap.get("companyName");
    this.companyName = companyname;
    this.perInService.getPersonalInventoryItems(this.companyName, -1, -1).subscribe((data: Array<any>) => {
      for (let i = 0; i < data.length; i++) {
        this.allitems.push(data[i]);
        console.log(this.allitems);
      }
    });
  }
}
