import { SearchDataService } from '../../_Service/search-data.service';
import { Component, OnInit,ElementRef } from '@angular/core';
import { data } from 'jquery';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../../_Service/user.service'
import { AuthService } from '../../_Service/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {

  public checkbox:boolean=false;
  public mySelectedTag:any;
  public selectedIndex:Number=1;
  public searchdata='';
  public searchService: SearchDataService;
  public navbar_clicked:boolean = false;
  navbar_toggle(){
    if(this.navbar_clicked){
      this.navbar_clicked = false
    }else{
      this.navbar_clicked = true;
    }
  }
  constructor(private el:ElementRef,private SearchDataService:SearchDataService,private user:UserService,private auth:AuthService,private router:Router) {
    this.searchService = this.SearchDataService;
  }

  ngOnInit(): void {
    this.mySelectedTag = this.el.nativeElement.querySelector("button.selected");
    this.searchService.setsearchedData(this.searchdata);
  }

  public onSelect(id:Number){
    this.navbar_clicked=false;
    this.selectedIndex=id;
    if(this.mySelectedTag.classList.contains("selected"))
    {
      this.mySelectedTag.classList.remove("selected");
    }
    
  }

  logout(){
    // this.user.logout().subscribe(data => {
    //   if(data.success) {
    //     this.router.navigate([''])
    //     this.auth.setLoggedIn(false)
    //   } else {
    //     window.alert('Some problem')
    //   }
    // })
    localStorage.removeItem("token")
    this.router.navigate([''])
  }
  updatesearchText(search:string){
    this.searchService.setsearchedData(search);
  }

}
