import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showEye: boolean=false;
  loginForm:FormGroup
  constructor(private router:Router,private service:CommonService) { }

  ngOnInit(): void {
   this.loginFormValidation()
    
  }
  loginFormValidation(){
    this.loginForm = new FormGroup({
      email:new FormControl("",Validators.required),
      password:new FormControl('',Validators.required)
    })
  }
  login(){
    let url="admin/login"
    let data= {
      email:this.loginForm.value.email,
      password:this.loginForm.value.password,
      
    }
    this.service.showSpinner()
    this.service.postApi(url,data,0).subscribe(res=>{
      this.service.hideSpinner()
      if(res['status']==200){
        this.service.logginData.next(res)
        localStorage.setItem('token',res['data'].token)
        localStorage.setItem('userId',res['data']._id)
        this.service.succMessage('Login Successfully')
        this.router.navigate(['/dashboard'])
      }
    })
    
  }
  
  forget(){
    this.router.navigate(['/forget-password'])
  }
showHidePassword(){
  this.showEye = !this.showEye

  
}

}
