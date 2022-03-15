import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Location } from '@angular/common'
import { MailServiceService } from '../_Service/mail-service.service';
import { Mail } from '../main/mails/mails.entity';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public id : Number = 1;
  public config: AngularEditorConfig={};
  

  //public person:any;
  public person: Mail = { mail_id: 0, from: "", msg: "", read: false, sub: "", time: "", username: "", to: "" };


  
  constructor(private location :Location,
    private router:Router,private ar:ActivatedRoute,private mail:MailServiceService) {
      
   }

  ngOnInit(): void { 
    this.id = Number(this.ar.snapshot.paramMap.get("id"));

    this.mail.getmail(this.id).subscribe((data:any) => {
      this.person = data[0];
      
    }); 

    this.config = {
      editable: false,
      height: 'fit-content',
      minHeight: 'fit-content',
      placeholder: this.person.msg,
      translate: 'no',
      showToolbar:false,
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
    };
    
  }
  Forward(id:number){
    this.router.navigate(['main/forward',id,"Forward"]);
  }
  
  public back(){
    this.location.back();
  }

}
