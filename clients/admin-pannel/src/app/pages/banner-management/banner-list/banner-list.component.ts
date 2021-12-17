import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';
declare var $
@Component({
  selector: 'app-banner-list',
  templateUrl: './banner-list.component.html',
  styleUrls: ['./banner-list.component.css']
})
export class BannerListComponent implements OnInit {
  bannerListArray=[]
  itemsPerPage=5;
  totalItems:any;
  currentPage=1;
  id: any;

  constructor(private service:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.bannerList()
  }
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
  viewProduct(id){
    this.router.navigate(['/view-banner'],{queryParams:{id:id}})
  }
  editProduct(id){
    this.router.navigate(['/edit-banner'],{queryParams:{id:id}})
  }

  deleteModal(id){
    this.id=id
    $('#delete').modal('show')
  }

  delete(){
    let url= "banner/delete-banner/"+this.id
    this.service.showSpinner()
   
    this.service.deleteApi(url,{},1).subscribe(res=>{
      if(res['statusCode']==200){
        $('#delete').modal('hide')
        this.service.hideSpinner()
        this.bannerList()
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
