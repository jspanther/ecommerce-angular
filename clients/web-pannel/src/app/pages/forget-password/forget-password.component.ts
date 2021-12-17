import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgotForm : FormGroup
  constructor(private servive : CommonService) { }

  ngOnInit(): void {
    this.forgotForm = new FormGroup({
      email : new FormControl()
    })
  }

  forgotPassword(){
    let url = "password/forgot-password"
    let data = {
      email:this.forgotForm.value.email,
      webUrl:this.servive.webUrl+'reset-password'
    }
    this.servive.showSpinner()
    this.servive.postApi(url,data,0).subscribe(res=>{
      if(res['statusCode']==200){
        this.servive.hideSpinner()
        localStorage.setItem('resetToken',res['data'].token)
        localStorage.setItem('userId',res['data'].userId)
        this.servive.succMessage(res['message'])
      }
      else{
        this.servive.hideSpinner()
        this.servive.errorMessage(res['message'])
      }
    })
  }

}
