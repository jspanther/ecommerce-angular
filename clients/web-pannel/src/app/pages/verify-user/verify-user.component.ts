import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {
  userId:any
  resetForm:FormGroup
  constructor(private service :CommonService , private router : Router) { }

  ngOnInit(): void {
    this.resetForm = new FormGroup({
      password:new FormControl(),
      confirmPassword: new FormControl()
    })
    this.userId = localStorage.getItem('userId')
    this.verifyUser()
  }

  verifyUser(){
    let url = `user/verify-user/${this.userId}`
    let data = {
      Verified: true
    }
    this.service.showSpinner()
    this.service.postApi(url,data,0).subscribe(res=>{
      this.service.hideSpinner()
      if(res['statusCode']== 200){
        this.service.succMessage(res['message'])
        this.router.navigate(['/logIn'])
      }
      else{
        this.service.errorMessage(res['message'])
      }
    })
  }

}
