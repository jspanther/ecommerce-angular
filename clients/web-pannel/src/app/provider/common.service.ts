import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private toastr: ToastrService, private spinner:NgxSpinnerService,private httpClient:HttpClient) { }
  baseUrl=''


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
  return this.httpClient.post(this.baseUrl+ endPointUrl, httpHeaders)
}
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
  return this.httpClient.put(this.baseUrl+ endPointUrl, httpHeaders)
}
}

  //Toaster Message
  succMessage(message){
    this.toastr.success(message);
  }
  errorMessage(message){
    this.toastr.success(message);
  }

  //show spinner
  showSpinner(){
    this.spinner.show()
    
  }
  hideSpinner(){
    this.spinner.hide()
    
  }
}
