import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ChangePassword() {
    this.router.navigate(["pages/change-password"]);
  }

}
