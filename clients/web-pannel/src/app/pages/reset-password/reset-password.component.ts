import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token:any
  userId:any
  resetForm:FormGroup
  showEye: boolean=false;
  constructor(private service :CommonService, private router :Router) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password:new FormControl(),
      confirmPassword: new FormControl()
    })
    this.token=localStorage.getItem('resetToken')
    this.userId = localStorage.getItem('userId')

  }

  resetPassword(){
    let url = `password/reset-password/${this.userId}`
    let data = {
      password: this.resetForm.value.password,
      token:this.token
    }
    this.service.showSpinner()
    this.service.postApi(url,data,0).subscribe(res=>{
      this.service.hideSpinner()
      if(res['statusCode'] == 200){
        this.service.succMessage(res['message'])
        this.router.navigate(['/logIn'])
      }
      else{
        this.service.errorMessage(res['message'])
      }
    })
  }
  showHidePassword(){
    this.showEye = !this.showEye
  }

}
