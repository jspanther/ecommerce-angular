import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';
declare var $
@Component({
  selector: 'app-static-content-management',
  templateUrl: './static-content-management.component.html',
  styleUrls: ['./static-content-management.component.css']
})
export class StaticContentManagementComponent implements OnInit {
  staticListArray=[]
  itemsPerPage=5;
  totalItems:any;
  currentPage=1;
  id: any;

  constructor(private service:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.staticList()
  }
  staticList(){
    this.service.showSpinner()
    let url = "static-content/get-static"
    this.service.getApi(url,1).subscribe((res)=>{
      if(res['statusCode']==200){
        this.staticListArray=res['data']
        this.service.hideSpinner()
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }
  viewStatic(id){
    this.router.navigate(['/view-static'],{queryParams:{id:id}})
  }
  editStatic(id){
    this.router.navigate(['/edit-static'],{queryParams:{id:id}})
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
        this.staticList()
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
