import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomValidators } from 'ngx-custom-validators';
import { ChangePasswordService } from '../change-password/change-password.service';
import { RegisterService } from '../register/register.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass']
})
export class ChangePasswordComponent implements OnInit {

  public forgotPasswordForm: FormGroup
  public successMessage: string;
  public errorMessage: string;
  public showSuccess: boolean;
  public showError: boolean;

  hide = true;
  hide1 = true;
  hide2 = true;
  changePasswordForm: FormGroup;
  constructor(private CPservice: ChangePasswordService, private Rservice: RegisterService, /*private toastr: ToastrService,*/ private route: ActivatedRoute) { }


  ngOnInit(): void {
    const currentPassword = new FormControl('', [Validators.required]);
    const newPassword = new FormControl('', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]);
    const ConfirmPassword = new FormControl('', CustomValidators.equalTo(newPassword));

    this.changePasswordForm = new FormGroup({
      CurrentPassword: currentPassword,
      NewPassword: newPassword,
      ConfirmNewPassword: ConfirmPassword
    });
  }

  onSubmit() {
    if (localStorage.getItem("token") != null) {
      const token = localStorage.getItem("token"); 
      console.log(token);
      const data = {
        "CurrentPassword": this.changePasswordForm.value.CurrentPassword,
        "NewPassword": this.changePasswordForm.value.NewPassword,
        "ConfirmNewPassword": this.changePasswordForm.value.ConfirmNewPassword
      }
      this.CPservice.changePassword(data).subscribe(result => { console.log(result); this.showSuccess = true; this.successMessage = "Password Changed Successfully!" }, error => { this.showError = true; this.errorMessage = "Unable to change password. Try Again!"; })
    }
  }
}
