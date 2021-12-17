import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';
declare var $

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productListArray=[]
  itemsPerPage=5;
  totalItems:any;
  currentPage=1;
  id: any;

  constructor(private service:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.productList()
  }
  productList(){
    this.service.showSpinner()
    let url = "product/product-list"
    this.service.getApi(url,1).subscribe((res)=>{
      if(res['status']==200){
        this.productListArray=res['data']
        this.service.hideSpinner()
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }
  viewProduct(id){
    this.router.navigate(['/view-product'],{queryParams:{id:id}})
  }
  editProduct(id){
    this.router.navigate(['/edit-product'],{queryParams:{id:id}})
  }

  deleteModal(id){
    this.id=id
    $('#delete').modal('show')
  }

  delete(){
    let url= "product/delete-product/"+this.id
    this.service.showSpinner()
   
    this.service.deleteApi(url,{},1).subscribe(res=>{
      if(res['status']==200){
        $('#delete').modal('hide')
        this.service.hideSpinner()
        this.productList()
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
    
  }
  pagination(item){
    this.currentPage=item
  }
}
