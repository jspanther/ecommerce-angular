import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm:FormGroup
  productId:any
  imageSrc:any
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.productFormValidation()
    this.router.queryParams.subscribe(res=>{
      this.productId= res.id
    })
    this.viewProduct()
  }

  viewProduct(){
    let url = `product/productId=${this.productId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      if(res['status']==200){
        this.imageSrc = res['data'].productImage
        this.service.hideSpinner()
        this.productForm.patchValue({
          productName:res['data'].productName,
          category:res['data'].category,
          mrp:res['data'].mrp,
          sellingPrice:res['data'].sellingPrice,
          discounts:res['data'].disscount,
          discription:res['data'].description
          // image:res['data'].productImage
        })
        
        
        // this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
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

  editProduct(){
    let url="product/update-product/"+this.productId
    let data={
      productName:this.productForm.value.productName,
      category:this.productForm.value.category,
      description:this.productForm.value.discription,
      mrp:this.productForm.value.mrp,
      sellingPrice:this.productForm.value.sellingPrice,
      disscount:this.productForm.value.discounts,
      image:this.productForm.value.image
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
