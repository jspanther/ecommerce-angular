import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$:Observable<string>
  constructor(public service:CommonService,private router:Router) { }

  ngOnInit(): void {
    this.isLoggedIn$  = this.service.isLogedIn
    // console.log(this.isLoggedIn$.source._value); 
    
  }
  login(){
    this.router.navigate(['/logIn'])
  }

}
