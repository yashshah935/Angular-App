// import { HeadComponent } from './../../head/head.component';
import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MailServiceService } from '../../_Service/mail-service.service';
import { Mail } from '../mails/mails.entity';
import { SearchDataService } from '../../_Service/search-data.service';
import { UserService } from '../../_Service/user.service'
@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['../main.component.css']
})
export class DraftComponent implements OnInit {
  public mail_list:Mail[]=[];
  public draft_list:Mail[] = [];
  public user_mail:String="yash@yash.com";
  public searchTerm:string = '';
  public searchService:SearchDataService;
  constructor(private mail:MailServiceService,private router:Router,private SearchDataService:SearchDataService,private el:ElementRef,private user:UserService) {
    this.searchService = this.SearchDataService;
  }

  ngOnInit(): void {
    this.user.getData().subscribe(data=>{
      this.user_mail=data.email
      this.mail.getDrafts().subscribe((data:any )=> {
        this.mail_list = data;
        this.draft_list = this.mail_list.filter(o=>o.from == this.user_mail);
        this.draft_list.sort((a:any, b:any) => (a.mail_id > b.mail_id ? -1 : 1));
      })
    })
    this.SearchDataService.share.subscribe( (x: string) => this.searchTerm = x);

  }
  navigate(id:Number){
    this.router.navigate(['main/draft/',id,"Draft"]);
  }

}
