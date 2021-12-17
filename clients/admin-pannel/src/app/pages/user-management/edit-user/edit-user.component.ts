import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm:FormGroup
  userId:any
  imageSrc:any
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.userFormValidation()
    this.router.queryParams.subscribe(res=>{
      this.userId= res.id
    })
    this.viewUser()
  }

  viewUser(){
    let url = `user/userId=${this.userId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      if(res['statusCode']==200){
        this.service.hideSpinner()
        this.userForm.patchValue({
          name:res['data'].name,
          mobile:res['data'].mobile,
          email:res['data'].email,
        })
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }
  userFormValidation(){
    this.userForm=new FormGroup({
      name:new FormControl(),
      mobile:new FormControl(),
      email:new FormControl(),
    })
  }

  editUser(){
    let url="user/update-user/"+this.userId
    let data={
      name:this.userForm.value.name,
      mobile:this.userForm.value.mobile,
      email:this.userForm.value.email,
   
    }
    console.log(data);

    this.service.showSpinner()
    this.service.putApi(url,data,1).subscribe(res=>{
      if(res['status']==200){
        this.service.hideSpinner()
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
      
    })
    
  }

}

