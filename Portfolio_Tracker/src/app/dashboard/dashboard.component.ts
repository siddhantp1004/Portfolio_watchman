import { AuthService } from '../service/auth.service';
import { ApiService } from '../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public users:any = [];
  public role!:string;

  public fullName : string = "";
  constructor(private api : ApiService, private auth: AuthService) { }

  ngOnInit() {
    this.api.getUsers()
    .subscribe(res=>{
    this.users = res;
    });

   
  } 

}