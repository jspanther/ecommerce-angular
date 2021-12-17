import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId:any
  userData:any
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(res=>{
      this.userId= res.id
    })
    this.viewUser()
    

  }
  viewUser(){
    let url = `user/userId=${this.userId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      if(res['statusCode']==200){
        this.userData = res['data']
        console.log(this.userData);
        
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
