import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-subadmin-list',
  templateUrl: './subadmin-list.component.html',
  styleUrls: ['./subadmin-list.component.css']
})
export class SubadminListComponent implements OnInit {
  itemsPerPage=5;
  totalItems:any;
  currentPage=1;
  adminListArray=[]
  constructor(private service: CommonService,private router:Router) { }

  ngOnInit(): void {
    this.subAdminList()
  }
  
  subAdminList(){
    this.service.showSpinner()
    let url="admin/admin-list"
    try{
    this.service.getApi(url,1).subscribe(res=>{ 
      if(res['statusCode'] == 200){
        this.adminListArray=res['data']
        console.log(this.adminListArray);
        this.totalItems= res['totalUser']
        this.service.hideSpinner()
        this.service.succMessage(res['message'])

      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }
  catch(err){
    this.service.hideSpinner()
    this.service.errorMessage('Something went wrong')

  }
  }

  viewAdmin(id){
    this.router.navigate(['/view-admin'],{queryParams:{id:id}})
  }
  editAdmin(id){
    this.router.navigate(['/edit-admin'],{queryParams:{id:id}})
  }
  deleteAdmin(id){
    this.router.navigate(['/user-details'],{queryParams:{id:id}})
  }
  //pagination
  pagination(item){
    this.currentPage=item
  }
}

