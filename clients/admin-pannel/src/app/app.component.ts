import { Component } from '@angular/core';
import { CommonService } from './provider/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public service: CommonService){}
  title = 'admin-pannel';
}
