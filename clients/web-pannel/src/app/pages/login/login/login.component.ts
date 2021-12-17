import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  loggedIn:boolean=false
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
    let data= {
      email:this.loginForm.value.email,
      password:this.loginForm.value.password,
      
    }
    this.service.showSpinner()
    this.service.postApi('user/login',data,0).subscribe(res=>{
      console.log(res);
      
      if(res['statusCode']==200){
        this.service.hideSpinner()
        this.service.loggedIn.next('LOGGED_IN')
        this.loggedIn=true;
        localStorage.setItem('token',res['data'].token)
        this.service.succMessage('Login Successfully')
        this.router.navigate(['/home'])
      }
      else{ 
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    },(err)=>{
      this.service.hideSpinner()
      this.service.errorMessage('Invalid Credentional')
    }
    
    )  
  }
  
  forget(){
    this.router.navigate(['/forget-password'])
  }
showHidePassword(){
  this.showEye = !this.showEye

  
}

}
