import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService, private spinner:NgxSpinnerService,private httpClient:HttpClient,private router:Router) { }
  // public baseUrl='https://ecommerce-web-api.herokuapp.com/'
  public baseUrl="http://localhost:3000/"
  public webUrl = "http://localhost:4300/"
  loggedIn= new BehaviorSubject('LOGGED_OUT')

  get isLogedIn(){
    return this.loggedIn.asObservable()
  }

  //get api function
  getApi(endPointUrl,isHeader):Observable<any>{
    var httpHeaders;
    if(isHeader == 0){
      httpHeaders= {
        headers: new HttpHeaders({
          'Content-Type' : 'application/json'
      })
    }
  }
  else{
    httpHeaders = {
      headers : new HttpHeaders({
        'Content-Type' : 'application/json',
        'Token': `${localStorage.getItem('token')}`
      })
    }
  }
  return this.httpClient.get(this.baseUrl+ endPointUrl,httpHeaders)
}


//post Api function 
postApi(endPointUrl, data, isHeader):Observable<any>{
  var httpHeaders;
  if(isHeader == 0){
    httpHeaders= {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
    })
  }
}
else{
  httpHeaders = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Token': `${localStorage.getItem('token')}`
    })
  }
}
return this.httpClient.post(this.baseUrl+endPointUrl,data, httpHeaders)
}


//put api
putApi(endPointUrl, data, isHeader):Observable<any>{
  var httpHeaders;
  if(isHeader == 0){
    httpHeaders= {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
    })
  }
}
else{
  httpHeaders = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json',
      'Token': `${localStorage.getItem('token')}`
    })
  }
}
return this.httpClient.put(this.baseUrl+ endPointUrl,data, httpHeaders)
}

  //Toaster Message
  succMessage(message){
    this.toastr.success(message);
  }
  errorMessage(message){
    this.toastr.error(message);
  }
  warnMessage(message){
    this.toastr.warning(message)
  }

  //show spinner
  showSpinner(){
    this.spinner.show()
  }
  hideSpinner(){
    this.spinner.hide()
  }

  public logged(){
    return localStorage.getItem('token')!= null;
    }
  
    public logOut(){
      localStorage.removeItem('token')
      this.router.navigate(['/logIn'])
    }
}
