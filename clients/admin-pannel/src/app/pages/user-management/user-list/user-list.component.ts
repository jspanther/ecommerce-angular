import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';
declare var $
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userListArray=[]
  itemsPerPage=5;
  totalItems:any;
  currentPage=1;
  userId: any;

  constructor(private service: CommonService,private router:Router) { }

  ngOnInit(): void {
    this.userList()
  }
  

  userList(){
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
    this.router.navigate(['/user-details'],{queryParams:{id:id}})
  }
  editUser(id){
    this.router.navigate(['/edit-user'],{queryParams:{id:id}})
  }
  delete(id){
    this.userId=id
    $('#delete').modal('show')
  }
  deleteUser(){
    let url = 'user/delete-user/'+this.userId
    $('#delete').modal('hide')
    this.service.showSpinner()
    this.service.deleteApi(url,{},1).subscribe(res=>{
      this.service.hideSpinner()
      if(res['statusCode']==200){
        this.userList()
        this.service.succMessage(res['message'])
      }
      else{
        this.service.errorMessage(res['message'])
      }
    })
  }
  //pagination
  pagination(item){
    this.currentPage=item
  }
}
