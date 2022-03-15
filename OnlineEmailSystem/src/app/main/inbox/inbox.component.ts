import { SearchDataService } from '../../_Service/search-data.service';
import { Component, OnInit,ElementRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { MailServiceService } from '../../_Service/mail-service.service';
import { Mail } from '../mails/mails.entity';
import { UserService } from '../../_Service/user.service'

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['../main.component.css']
})
export class InboxComponent implements OnInit {
  public checkbox:boolean=false;
  public mail_list:Mail[]=[];
  public inbox_list:any = [];
  public user_mail:string = "yash@yash.com";

  public searchTerm:string = '';
  public searchService:SearchDataService;

  config: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(private mail:MailServiceService,private router:Router,private SearchDataService:SearchDataService,private el:ElementRef,private user:UserService) {
    //this.searchTerm = this.SearchDataService.getsearchedData()
    //console.log(this.searchTerm);
    this.searchService = this.SearchDataService;
  }

  ngOnInit(): void {
    this.user.getData().subscribe(data=>{
      this.user_mail=data.email
      this.mail.getMails().subscribe((data:any )=> {
        this.mail_list = data;
        this.inbox_list = this.mail_list.filter(o=>o.to == this.user_mail);
        this.inbox_list.sort((a:any, b:any) => (a.mail_id > b.mail_id ? -1 : 1));
      })
    })
    
    
    this.SearchDataService.share.subscribe( (x: string) => this.searchTerm = x);
    
  }

  navigate(id:any){
    var obj = this.mail_list.find((o)=> o.mail_id == id)
    if(obj?.read == false){
      this.mail.Mailread(id).subscribe(

      );
    }
    this.router.navigate(['/main/page_content',id]);
  }
}
