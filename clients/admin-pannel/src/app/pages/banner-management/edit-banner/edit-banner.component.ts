import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.css']
})
export class EditBannerComponent implements OnInit {
  bannerId:any
  bannerData:any
  imageSrc: string;
  bannerForm:FormGroup
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.bannerFormValidation()
    this.router.queryParams.subscribe(res=>{
      this.bannerId= res.id
    })
    this.viewBanner()
    

  }
  viewBanner(){
    let url = `banner/bannerId=${this.bannerId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      this.service.hideSpinner()
      if(res['statusCode']==200){
        
       this.imageSrc=res['data'].bannerImage
       
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }

  bannerFormValidation(){
    this.bannerForm=new FormGroup({
      image:new FormControl()
    })
  }

  editBanner(){
    let url="banner/edit-banner"
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

