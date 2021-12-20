import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-stati-content',
  templateUrl: './stati-content.component.html',
  styleUrls: ['./stati-content.component.css']
})
export class StatiContentComponent implements OnInit {
  pageKey:any
  staticData=[]
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(res=>{
      this.pageKey=res.id
    })

  }
  staticContent(id){
    let url = "static-content/pageKey="+this.pageKey
    this.service.showSpinner()
    this.service.getApi('url',0).subscribe(res=>{
      this.staticData=res['data']
      this.service
    })
  }

}
