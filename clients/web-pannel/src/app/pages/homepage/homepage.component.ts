import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  productArray=[]
  bannerListArray=[]
  userId='61b9c0794235e612dd87a69b'
  constructor(private service:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.productList()
    this.bannerList()
  }
  //product list api function
  productList(){
    // this.service.showSpinner()
    this.service.getApi('product/product-list',1).subscribe(res=>{
      if(res.status==200){
        this.service.hideSpinner()
        this.productArray=res.data
        console.log(this.productArray);
        
        this.service.succMessage(res.message)
      }
      else  {
        this.service.hideSpinner()
        this.service.errorMessage(res.message)
      }
    })
  }
  //banner 
 
  bannerList(){
    this.service.showSpinner()
    let url = "banner/banner-list"
    this.service.getApi(url,0).subscribe((res)=>{
      if(res['statusCode']==200){
        this.bannerListArray=res['data']
        this.service.hideSpinner()
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }



  //add to cart api function
  addCart(id){
    let url = `cart/add-cart/${this.userId}`
    let data= {
      products: [{ productId:id,
         quantity:1}]
    }
    console.log(data);
    
    // this.service.showSpinner()
    this.service.postApi(url,data,0).subscribe(res=>{
      console.log(res);
      // this.router.navigate(['/cart'])
    })
    
  }
}
