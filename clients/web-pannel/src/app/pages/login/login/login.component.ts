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
    let url=""
    let data= {
      email:this.loginForm.value.email,
      password:this.loginForm.value.password
    }
    this.service.postApi(url,data,1).subscribe(res=>{
      this.service.hideSpinner()
      this.service.succMessage('Login Successfully')

    })
    this.router.navigate(['/home'])
  }
  
  forget(){
    this.router.navigate(['/forget-password'])
  }
showHidePassword(){
  this.showEye = !this.showEye

  
}

}
