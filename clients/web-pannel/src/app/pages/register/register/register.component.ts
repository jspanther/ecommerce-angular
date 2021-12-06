import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 signupForm:FormGroup
 showEye:boolean=false
  constructor(private service:CommonService) { }

  ngOnInit(): void {
    this.signupFormValidation()
  }
  signupFormValidation(){
    this.signupForm=new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',Validators.required),
      mobile:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }

  signUp(){
    let url=""
    let data={
      name:this.signupForm.value.name,
      email:this.signupForm.value.email,
      mobile:this.signupForm.value.mobile,
      password:this.signupForm.value.password,
      userType:'User'
    }
    console.log(data);
    
    // this.service.showSpinner()
    // this.service.postApi(url,data,1).subscribe(res=>{
    //   if(res.status==200){
    //     this.service.hideSpinner()
    //     this.service.succMessage("verification link sent on your email");
    //   }
    // })
  }
  showHidePassword(){
    this.showEye = !this.showEye
  
    
  }
}
