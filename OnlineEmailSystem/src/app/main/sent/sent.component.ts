import { HeadComponent } from './../../_Layout/head/head.component';
import { SearchDataService } from '../../_Service/search-data.service';
import { Component, OnInit,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MailServiceService } from '../../_Service/mail-service.service';
import { Mail } from '../mails/mails.entity';
import { UserService } from '../../_Service/user.service'

@Component({
  selector: 'app-sent',
  templateUrl: './sent.component.html',
  styleUrls: ['../main.component.css']
})
export class SentComponent implements OnInit {
  public mail_list:Mail[]=[];
  public sent_list:any = [];
  
  public user_mail:string = "";

  public searchTerm:string = '';
  public searchService:SearchDataService;
  constructor(private mail:MailServiceService,private router:Router,private SearchDataService:SearchDataService,private el:ElementRef,private user:UserService) {
    this.searchService = this.SearchDataService;
    // console.log(this.user_mail)
  }

  ngOnInit(): void {
    this.user.getData().subscribe(data=>{
      this.user_mail=data.email
      console.log(this.user_mail)
      this.mail.getMails().subscribe((data:any )=> {
        this.mail_list = data;
        console.log(this.user_mail)
        this.sent_list = this.mail_list.filter(o=>o.from == this.user_mail);
        this.sent_list.sort((a:any, b:any) => (a.mail_id > b.mail_id ? -1 : 1));
        console.log(this.sent_list)
      })
    })
    
      this.SearchDataService.share.subscribe( (x: string) => this.searchTerm = x);

  }
  navigate(id:Number){
    this.router.navigate(['/main/page_content',id]);
  }

}
