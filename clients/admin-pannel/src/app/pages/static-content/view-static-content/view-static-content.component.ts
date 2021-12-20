import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-view-static-content',
  templateUrl: './view-static-content.component.html',
  styleUrls: ['./view-static-content.component.css']
})
export class ViewStaticContentComponent implements OnInit {
  pageKey:any
  staticData:any
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
      if(res['statusCode']==200){
        this.staticData = res['data']
        console.log(this.staticData);
        this.service.hideSpinner()
        this.service.succMessage(res['message'])
      }
      else{
        this.service.hideSpinner()
        this.service.errorMessage(res['message'])
      }
    })
  }

  edit(){
    this.route.navigate(['/edit-static'],{queryParams:{id:this.pageKey}})
  }
}
