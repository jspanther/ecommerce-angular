import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  userId:any
  userData:any
  constructor(private service:CommonService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.service.logginData.subscribe(res=>{
      this.userId= res
      console.log("==========>",res);
      
      
    })
    this.userId = localStorage.getItem('userId')
    this.viewUser()
    

  }
  viewUser(){
    let url = `profile/get-profile/${this.userId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      this.service.hideSpinner()
      if(res['statusCode']==200){
        this.userData = res['data']
        
        this.service.succMessage(res['message'])
      }
      else{
        this.service.errorMessage(res['message'])
      }
    })
  }

  editProfile(id){
    this.route.navigate(['/edit-profile'],{queryParams:{id:id}})
  }

}
