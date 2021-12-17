import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-view-banner',
  templateUrl: './view-banner.component.html',
  styleUrls: ['./view-banner.component.css']
})
export class ViewBannerComponent implements OnInit {
  bannerId:any
  bannerData:any
  constructor(private service:CommonService,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(res=>{
      this.bannerId= res.id
    })
    this.viewBanner ()
    

  }
  viewBanner(){
    let url = `banner/bannerId=${this.bannerId}`
    this.service.showSpinner()
    this.service.getApi(url,1).subscribe(res=>{
      if(res['statusCode']==200){
        this.bannerData = res['data']
        console.log(this.bannerData);
        
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
