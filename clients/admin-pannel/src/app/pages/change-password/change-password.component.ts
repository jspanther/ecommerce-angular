import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  showEye=false
  passwordForm:FormGroup
  userId:any='61bb2a61b7291218a8e85525'
  token:any
  constructor(private servive : CommonService,private router: Router) { }

  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      oldPassword : new FormControl(),
      newPassword : new FormControl(),
      confirmPassword : new FormControl()
    })
  }

  resetPassword(){
    let url = `password/change-password/${this.userId}`
    let data = {
      oldPassword:this.passwordForm.value.oldPassword,
      newPassword:this.passwordForm.value.newPassword,
    }
    this.servive.showSpinner()
    this.servive.postApi(url,data,1).subscribe(res=>{
      if(res['statusCode']==200){
        this.servive.hideSpinner()
        localStorage.removeItem('resetToken')
        this.servive.succMessage(res['message'])
        this.router.navigate(['/login'])
      }
      else{
        this.servive.hideSpinner()
        this.servive.errorMessage(res['message'])
      }
    })
  }




  showHidePassword(){
    this.showEye = !this.showEye
  }
}
