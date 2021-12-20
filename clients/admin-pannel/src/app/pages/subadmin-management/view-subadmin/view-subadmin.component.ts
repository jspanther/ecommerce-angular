import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-view-subadmin',
  templateUrl: './view-subadmin.component.html',
  styleUrls: ['./view-subadmin.component.css']
})
export class ViewSubadminComponent implements OnInit {
  userId:any
  imageSrc:any
  adminData:any
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.router.queryParams.subscribe(res=>{
      this.userId= res.id
    })
    // this.viewUser()
  }

  viewUser(){
    let url = `user/userId=${this.userId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      if(res['statusCode']==200){
        this.service.hideSpinner()
        this.adminData = res['data']
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }
}