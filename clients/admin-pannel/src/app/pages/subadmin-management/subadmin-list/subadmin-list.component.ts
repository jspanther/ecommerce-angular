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
  userListArray=[]
  constructor(private service: CommonService,private router:Router) { }

  ngOnInit(): void {
    // this.subAdminList()
  }
  
  subAdminList(){
    this.service.showSpinner()
    let url="user/user-list"
    try{
    this.service.getApi(url,1).subscribe(res=>{
      console.log(res['statusCode']);
      
      if(res['statusCode'] == 200){
        this.userListArray=res['data']
        console.log(this.userListArray);
        this.totalItems= res['totalUser']
        this.service.hideSpinner()
        this.service.succMessage(res['message'])

      }
      else if(res['status'] == 401){
        console.log("error");
        
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

  viewUser(id){
    this.router.navigate(['/view-admin'],{queryParams:{id:id}})
  }
  editUser(id){
    this.router.navigate(['/edit-admin'],{queryParams:{id:id}})
  }
  deleteUser(id){
    this.router.navigate(['/user-details'],{queryParams:{id:id}})
  }
  //pagination
  pagination(item){
    this.currentPage=item
  }
}

