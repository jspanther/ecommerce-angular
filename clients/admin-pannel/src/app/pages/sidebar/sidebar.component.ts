import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/provider/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public service: CommonService) { }

  ngOnInit(): void {
  }

}
