import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editForm:FormGroup
  userId:any
  userData:any
  imageSrc:any
  constructor(private service:CommonService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.editFormValidation()
    this.router.queryParams.subscribe(res=>{
      this.userId= res.id
      console.log(res);
      
    })
    this.viewUser()
    

  }

  editFormValidation(){
    this.editForm = new FormGroup({
      name:new FormControl(),
      mobile:new FormControl(),
      email:new FormControl(),
      image:new FormControl()
    })
  }

  viewUser(){
    let url = `profile/get-profile/${this.userId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      this.service.hideSpinner()
      this.imageSrc=res['data'].userImage
      if(res['statusCode']==200){
        this.editForm.patchValue({
          name:res['data'].name,
          mobile:res['data'].mobile,
          email:res['data'].email,
        })
      }
      else{
        this.service.errorMessage(res['message'])
      }
    })
  }

  editProfile(){
    let url =`profile/update-profile/${this.userId}`
    let data = {
      name:this.editForm.value.name,
      mobile:this.editForm.value.mobile,
      email:this.editForm.value.email,
      image:this.imageSrc
    }
    this.service.showSpinner()
    this.service.putApi(url,data,1).subscribe(res=>{
      this.service.hideSpinner()
      if(res['statusCode']==200){
        this.service.succMessage(res['message'])
      }
      else{
        this.service.errorMessage(res['message'])
      }
    })
  }
////---------------image upload functionality ------------//

uploadImg($event){
  var img = $event.target.files[0]
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = () => {
   this.imageSrc = reader.result as string;
 };
  this.uploadImageFunc(img);
}

uploadImageFunc(img){
  var fb = new FormData();
  fb.append('image',img)
  this.service.showSpinner()
  this.service.imageuploader('upload-image',fb).subscribe(res=>{
    this.service.hideSpinner()
    if(res['statusCode']==200){
      this.service.succMessage(res['message'])
    }
  })

}

}
