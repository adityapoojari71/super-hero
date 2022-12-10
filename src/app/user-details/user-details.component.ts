import { Component } from '@angular/core';
import {  Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  heroDetails:any=[];
  constructor(private httpClient : HttpClient,private router: Router,private route: ActivatedRoute,){
   
  }

  ngOnInit(){
    console.log("Entred");
    this.getHeroInformation();
  }

  //method to get perticular hero Information
  async getHeroInformation(){
    var id = this.route.snapshot.paramMap.get("id");
    console.log(id)
    var restAPI= "https://akabab.github.io/superhero-api/api/id/"+id+".json";
    this.heroDetails= await  this.httpClient.get(restAPI).toPromise().then();
    console.log(this.heroDetails)
  }
}
