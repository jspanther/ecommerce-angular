import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-add-subadmin',
  templateUrl: './add-subadmin.component.html',
  styleUrls: ['./add-subadmin.component.css']
})
export class AddSubadminComponent implements OnInit {
  userForm:FormGroup
  userId:any
  imageSrc:any
  checkList=[]
  newArr=[];
  checkBoolead: boolean=true;

  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.userFormValidation()
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

  addAdmin(){
    let url="admin/create-admin"
    let data={
      name:this.userForm.value.name,
      mobile:this.userForm.value.mobile,
      email:this.userForm.value.email,
      role:'subAdmin',
      adminPermission:this.newArr,
      webUrl:this.service.webUrl+'reset-password',
   
    }
    console.log(data);

    this.service.showSpinner()
    this.service.postApi(url,data,1).subscribe(res=>{
      if(res['statusCode']==200){
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

 
