import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.css']
})
export class AddBannerComponent implements OnInit {
  bannerForm:FormGroup
  imageSrc:any
  constructor( private service: CommonService) { }

  ngOnInit(): void {
    this.bannerFormValidation()
  }
  bannerFormValidation(){
    this.bannerForm=new FormGroup({
      image:new FormControl()
    })
  }

  addBanner(){
    let url="banner/add-banner"
    let data={
      bannerImage:this.imageSrc
    }
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
