import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-edit-subadmin',
  templateUrl: './edit-subadmin.component.html',
  styleUrls: ['./edit-subadmin.component.css']
})
export class EditSubadminComponent implements OnInit {
  userForm:FormGroup
  userId:any
  imageSrc:any
  checkList=[]
  newArr=[];
  checkBoolead: boolean=true;
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.userFormValidation()
    this.router.queryParams.subscribe(res=>{
      this.userId= res.id
    })
    this.viewAdmin()
  }

  viewAdmin(){
    let url = `user/userId=${this.userId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      if(res['statusCode']==200){
        this.service.hideSpinner()
        this.checkList = res['data']['adminPermission']
        
        console.log(this.checkList);
        this.checkList.forEach(element=>{
          if(element == 'DASHBOARD'){
            this.newArr.push(element)
            this.userForm.patchValue({
              dashboardChecked: this.checkBoolead
            })
          }
          if(element == 'USER_MANAGEMENT'){
            this.newArr.push(element)
            this.userForm.patchValue({
              userChecked: this.checkBoolead
            })
          }
          if(element == 'PRODUCT_MANAGEMENT'){
            this.newArr.push(element)
            this.userForm.patchValue({
              adminChecked: this.checkBoolead
            })
          }
          if(element == 'STATIC_CONTENT'){
            this.newArr.push(element)
            this.userForm.patchValue({
              dashboardChecked: this.checkBoolead
            })
          }
          if(element == 'BANNER'){
            this.newArr.push(element)
            this.userForm.patchValue({
              productChecked: this.checkBoolead
            })
          }
          if(element == 'SUB_ADMIN'){
            this.newArr.push(element)
            this.userForm.patchValue({
              bannerChecked: this.checkBoolead
            })
          }
          if(element == 'SUB_ADMIN'){
            this.newArr.push(element)
            this.userForm.patchValue({
              staticChecked: this.checkBoolead
            })
          }
        })
        this.userForm.patchValue({
          name:res['data'].name,
          mobile:res['data'].mobile,
          email:res['data'].email,
          userRole:res['data'].role
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
      userRole:new FormControl(),
      dashboardChecked:new FormControl(),
      userChecked:new FormControl(),
      adminChecked:new FormControl(),
      productChecked:new FormControl(),
      bannerChecked:new FormControl(),
      staticChecked:new FormControl(),
    })
  }

  editAdmin(){
    let url="user/update-user/"+this.userId
    let data={
      name:this.userForm.value.name,
      mobile:this.userForm.value.mobile,
      email:this.userForm.value.email,
      role:'subAdmin',
      adminPermission:this.checkList,
      webUrl:this.service.webUrl+'reset-password',
   
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

  checkboxClick(value,checked){
    console.log(value,checked);
    if(checked == true){
      this.newArr.push(value)
    }
    else{
      let index = this.newArr.findIndex(x=>x==value)
      console.log(index);
      this.newArr.splice(index,1)
      console.log("arr", this.newArr);
      
      
    }
  }

}

 