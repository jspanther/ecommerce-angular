import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showEye: boolean=false;

  constructor(private router:Router,private service:CommonService) { }

  ngOnInit(): void {
    console.log("Hi login");
    
  }

  login(){
    this.service.succMessage('Login Successfully')
    this.router.navigate(['/home'])
  }
  
  forget(){
    this.router.navigate(['/forget-password'])
  }
showHidePassword(){
  this.showEye = !this.showEye

  
}

}
