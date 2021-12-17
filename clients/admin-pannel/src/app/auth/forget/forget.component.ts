import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {
  forgotForm:FormGroup
  constructor(private service : CommonService) { }

  ngOnInit(): void {
    this.formValidation()
  }
  formValidation(){
    this.forgotForm = new FormGroup({
      email : new FormControl()
    })
  }
  forgotPassword(){
    let url = "password/forgot-password"
    let data = {
      email:this.forgotForm.value.email,
      webUrl:this.service.webUrl+'reset-password'
    }
    this.service.showSpinner()
    this.service.postApi(url,data,0).subscribe(res=>{
      if(res['statusCode']==200){
        this.service.hideSpinner()
        localStorage.setItem('resetToken',res['data'].token)
        localStorage.setItem('userId',res['data'].userId)
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }

}



