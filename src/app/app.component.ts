import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Router,ActivatedRoute } from '@angular/router';
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'super-hero';

  //variables for store hero information
  heroData:any=[];
  refrenceHeroData:any=[];
  heroDetails:any=[];

  //variables for pagination
  totalRecords: any = 0;
	page: any = 1;

  //variable for indiviual hero
  homePage :boolean = true;

  //variable for hero exist or not sucess meessage
  heroExist:string="";
  constructor(private httpClient : HttpClient,private router: Router,private route: ActivatedRoute,){
    console.log(route)
    var id = this.route.snapshot.paramMap.get("id");
    console.log(id);

  }

  ngOnInit(){
    this.getHeroInformation();
  }

  //method to get heros information
  async getHeroInformation(){
    var api= "https://akabab.github.io/superhero-api/api/all.json"
    this.heroData= await  this.httpClient.get(api).toPromise().then();
    this.refrenceHeroData = this.heroData;
    this.totalRecords = this.heroData.length;
    this.homePage = true;
    this.page = 1;    

  }

    //method to get perticular hero Information
  async showHeroInformation(data:any){
    this.homePage = false;
    // this.router.navigate(['/hero-information', data.id]); 
    var restAPI= "https://akabab.github.io/superhero-api/api/id/"+data.id+".json";
    this.heroDetails= await  this.httpClient.get(restAPI).toPromise().then();
    this.gotoTop();
  }

  //method to back detail page
  backToDetailPage(){
    this.homePage = true;
  }


  //method to serach hero from serachbar
  async serachHeros(){
    var heroName = $('#search').val();
    var found = this.refrenceHeroData.filter(function(item:any) { return item.name === heroName; });

    if(found.length != 0){
      this.heroData = found;
      this.totalRecords = this.heroData.length;
      this.heroExist ="";
    }
    else{
      this.heroData = this.refrenceHeroData;
      this.heroExist ="Hero Not Found";
    }
   
    if(heroName ==""){
      this.heroExist ="";
    }
  }

  //method to clear serach box
  clearSerachBox(){
    if($('#search').val() == ""){
      this.heroExist ="";
    }
  }

  //method to gotop
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}

