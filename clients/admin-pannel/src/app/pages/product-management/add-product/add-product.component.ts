import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm:FormGroup
  imageSrc:any
  constructor( private service: CommonService) { }

  ngOnInit(): void {
    this.productFormValidation()
  }
  productFormValidation(){
    this.productForm=new FormGroup({
      productName:new FormControl(),
      category:new FormControl(),
      mrp:new FormControl(),
      sellingPrice:new FormControl(),
      discounts:new FormControl(),
      discription:new FormControl(),
      image:new FormControl()
    })
  }

  addProduct(){
    let url="product/add-product"
    let data={
      productName:this.productForm.value.productName,
      category:this.productForm.value.category,
      description:this.productForm.value.discription,
      mrp:this.productForm.value.mrp,
      sellingPrice:this.productForm.value.sellingPrice,
      disscount:this.productForm.value.discounts,
      productImage:this.imageSrc
    }
    console.log(data);

    this.service.showSpinner()
    this.service.postApi(url,data,1).subscribe(res=>{
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
