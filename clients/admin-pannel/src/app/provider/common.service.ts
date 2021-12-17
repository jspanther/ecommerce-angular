import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private toastr: ToastrService, private spinner:NgxSpinnerService,private httpClient:HttpClient
    ,private router :Router) { }
  public baseUrl = 'http://localhost:3000/'
  public webUrl = "http://localhost:4200/"
  logginData = new Subject()


  //get api function
  getApi(endPointUrl,isHeader){
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
        'Authorization':`Bearer ${localStorage.getItem('token')}`
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
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }
 
}
return this.httpClient.post(this.baseUrl+ endPointUrl,data, httpHeaders)
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
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }
  
}
return this.httpClient.put(this.baseUrl+ endPointUrl,data, httpHeaders)
}

//delete api function
deleteApi(endPointUrl,data, isHeader):Observable<any>{
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
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }),
    body:data
  }
  
}
return this.httpClient.delete(this.baseUrl+ endPointUrl, httpHeaders)
}



imageuploader(endpoint,data){
  return this.httpClient.post(this.baseUrl+endpoint,data)
}

  //Toaster Message
  succMessage(message){
    this.toastr.success(message);
  }
  errorMessage(message){
    this.toastr.error(message);
  }

  //show spinner
  showSpinner(){
    this.spinner.show()
    
  }
  hideSpinner(){
    this.spinner.hide()
    
  }

 public isLoggedIn(){
  return localStorage.getItem('token')!= null;
  }

  public logOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
