import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  showEye=false
  resetForm:FormGroup
  userId:any
  token:any
  constructor(private servive : CommonService,private router: Router) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password : new FormControl(),
      confirmPassword : new FormControl()

    })
    this.token = this.token=localStorage.getItem('resetToken')
    this.userId = localStorage.getItem('userId')
  }

  resetPassword(){
    let url = `password/reset-password/${this.userId}`
    let data = {
      password:this.resetForm.value.password,
      token:this.token
    }
    this.servive.showSpinner()
    this.servive.postApi(url,data,0).subscribe(res=>{
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
