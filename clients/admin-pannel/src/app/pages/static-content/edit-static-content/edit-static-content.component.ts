import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-edit-static-content',
  templateUrl: './edit-static-content.component.html',
  styleUrls: ['./edit-static-content.component.css']
})
export class EditStaticContentComponent implements OnInit {
  pageKey:any
  staticData:any=[]
  contentData:any
  constructor(private service:CommonService,private router:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(res=>{
      this.pageKey= res.id
    })
    this.viewUser()
    

  }
  viewUser(){
    let url = `static-content/pageKey=${this.pageKey}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      console.log(res);
      
      if(res['statusCode']==200){
        this.staticData = res['data']
        this.contentData=this.staticData.data
        this.service.hideSpinner()
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }

  upadateContent(){
    let url = `static-content/update-static/${this.pageKey}`
    let data = {
      // pageKey:this.pageKey,
      data:this.contentData
    }
    this.service.putApi(url,data,1).subscribe(res=>{
      this.service.hideSpinner()
      if(res['statusCode']==200){
        this.service.succMessage(res['message'])
      }
      else{
        this.service.errorMessage(res['message'])
      }
    })

  }

}
