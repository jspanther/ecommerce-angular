import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productId:any
  productData:any
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
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
        this.productData = res['data']
        console.log(this.productData);
        
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
