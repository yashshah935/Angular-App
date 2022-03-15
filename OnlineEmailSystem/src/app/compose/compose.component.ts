import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailServiceService } from '../_Service/mail-service.service';
import { Location, CommonModule } from '@angular/common';
import { Mail } from '../main/mails/mails.entity';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserService } from '../_Service/user.service';
import * as $ from 'jquery';



@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  // public htmlContent="";
  tog_fname: boolean = true;
  mini: boolean = true;
  public title: string = "New"
  public new: boolean = true;
  public forward: boolean = false;
  public draft: boolean = false;
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };
  public id: number;
  public user_mail: string = "";
  public user_username: string = "";
  //public person: any;
  public new_mail: Mail = { mail_id: 0, from: "", msg: null, read: false, sub: "", time: "", username: "", to: "" };

  constructor(private location: Location, private router: Router, private ar: ActivatedRoute, private mail: MailServiceService, private user: UserService) {
    this.id = 0;
  }


  minimize() {
    const elem = document.getElementById("message-input");
    const elem1 = document.getElementById("message-footer");
    const elem2 = document.getElementById("compose");
    if (elem && elem1 && elem2) {
      elem.style.display = "none";
      elem1.style.display = "none";
      elem2.className = "col-md-3 p-3";
      elem2.style.bottom = "10px";
      elem2.style.position = "fixed";
      var text1 = document.getElementById("text1");
      if (text1)
        text1.style.fontSize = "16px";
    }

    this.mini = true;
    this.tog_fname = true;
  }

  closemail() {
    const elem = document.getElementById("compose");
    if (elem)
      elem.style.display = "none";

    if (this.title == "New" || this.title == "Forward") {
      this.new_mail.time = (String)(new Date());
      this.new_mail.read = false;
      //this.new_mail.msg = this.htmlContent;
      this.user.getData().subscribe(data => {
        this.user_mail = data.email;
        this.new_mail.from = this.user_mail;
        this.user_username = data.username;
        this.new_mail.username = this.user_username;
        this.mail.postDraft(this.new_mail).subscribe({
          next: data => {
            console.log("Mail Added!!")
            //alert("Draft Saved Sucessfully!");
            this.router.navigate(['/main/inbox']);

          },
          error: error => console.log("Cannot add a new Draft" + error)
        })
      })

    } else {
      //Update
      //var text = $('[role=textbox]').text();
      this.new_mail.mail_id = this.id;
      console.log(this.new_mail.mail_id);
      this.new_mail.time = (String)(new Date());
      this.new_mail.read = false;
      //alert(this.new_mail.msg);
      this.new_mail.username = this.user_username;
      this.user.getData().subscribe(data => {
        this.user_mail = data.email
        this.new_mail.from = this.user_mail;
        this.user_username = data.username;
        this.new_mail.username = this.user_username;
        this.mail.putDraft(this.new_mail).subscribe({
          next: data => {
            console.log("Draft Updated Sucessfully!");
            this.router.navigate(['/main/draft']);

          },
          error: error => console.log("Cannot add a new Draft" + error)
        })
      })
      this.location.back();
    }
  }
  discard() {
    var ans = confirm("Remove draft!!");
    if (ans) {
      if (this.title == "Draft") {
        //console.log(this.person.mail_id);
        this.user.getData().subscribe(data => {
          this.user_mail = data.email
          this.user_username = data.username;
          this.new_mail.username = this.user_username;
          this.mail.deleteDraft(this.new_mail.mail_id).subscribe({
            next: data => {
              console.log("Mail Removed");
              this.location.back();

            },
            error: error => console.log("Cannot remove mail" + error)
          });
        })

      }
      else {
        this.location.back();
      }
    }

  }
  maxscreen() {
    const elem = document.getElementById("compose");
    const elem3 = document.getElementById("mail_text");
    if (elem && elem3) {
      elem.className = "col-md-12 p-3";
      elem3.style.height = "300px";
    }
    this.tog_fname = !this.tog_fname;
    if (this.mini && elem) {
      const elem2 = document.getElementById("message-input");
      const elem1 = document.getElementById("message-footer");
      var text1 = document.getElementById("text1");
      elem.style.bottom = "0px";
      elem.style.position = "sticky";
      if (text1)
        text1.style.fontSize = "25px";
      if (elem2 && elem1) {
        elem2.style.display = "block";
        elem1.style.display = "block";
      }
      this.mini = false;
    }
  }
  minscreen() {
    const elem = document.getElementById("compose");
    const elem3 = document.getElementById("mail_text");
    if (elem && elem3) {
      elem.className = "col-md-4 p-3";
      elem3.style.height = "156px"
      var text1 = document.getElementById("text1");
      if (text1)
        text1.style.fontSize = "18px";
    }
    this.tog_fname = !this.tog_fname;
  }

  Send() {
    if (this.new_mail.to == "") {
      alert("mail To field can not be empty");

      $("#to_email")?.focus();
      $("#to_email")?.css('border', '1px solid red');

      setTimeout(() => {
        $("#to_email")?.css('border', 'none');
      }, 2000);


    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(String(this.new_mail.to)))) {
      alert("Invalid To Mail");
      $("#to_email")?.focus();
      $("#to_email")?.css('border', '1px solid red');
      setTimeout(() => {
        $("#to_email")?.css('border', 'none');
      }, 2000);
    } else if (this.new_mail.to != "") {
      this.user.mailValidate(String(this.new_mail.to)).subscribe(data => {
        if (data.status) 
        {
          if (this.new_mail.sub == "") {
            alert("Subject field can not be empty");
            $("#mail_subject")?.focus();
            $("#mail_subject")?.css('border', '1px solid red');

            setTimeout(() => {
              $("#mail_subject")?.css('border', 'none');
            }, 2000);
          } else {
            this.new_mail.time = (String)(new Date());
            this.new_mail.read = false;
            this.user.getData().subscribe(data => {
              this.user_mail = data.email
              this.new_mail.from = this.user_mail;
              this.user_username = data.username;
              this.new_mail.username = this.user_username;
              this.new_mail.mail_id = 0
              this.mail.postMail(this.new_mail).subscribe({
                next: data => {
                  console.log("Mail Added!!" + data)
                  alert("Mail Send Sucessfully!");
                  this.router.navigate(['/main/sent']);
                },
                error: error => console.log("Cannot add a new Mail" + error)
              })
            })
           }

        } else {
          alert(data.message);

          $("#to_email")?.focus();
          $("#to_email")?.css('border', '1px solid red');

          setTimeout(() => {
            $("#to_email")?.css('border', 'none');
          }, 2000);
        }
      }

      )
    }

  }


  ngOnInit(): void {
    this.user.getData().subscribe(data => {
      this.user_mail = data.email
    })
    if (this.ar.snapshot.paramMap.get("id") != null && this.ar.snapshot.paramMap.get("title") != null) {
      this.new = false;
      this.id = Number(this.ar.snapshot.paramMap.get("id"));
      this.title = String(this.ar.snapshot.paramMap.get("title"));
      if (this.title == "Draft") {
        this.draft = true;
        this.new = false;
        this.forward = false;
        this.user.getData().subscribe(data => {
          this.user_mail = data.email
          this.user_username = data.username;
          //this.new_mail.username=this.user_username;
          this.mail.getDraft(this.id).subscribe((data: any) => {
            this.new_mail = data[0];
            //this.htmlContent = this.new_mail.msg;
            this.id = this.new_mail.mail_id;
            console.log(this.new_mail);
          });
        })

      } else if (this.title == "Forward") {
        this.draft = false;
        this.new = false;
        this.forward = true;
        this.user.getData().subscribe(data => {
          this.user_username = data.username;
          //this.new_mail.username=this.user_username;
          this.user_mail = data.email
          this.mail.getmail(this.id).subscribe((data: any) => {
            this.new_mail = data[0];
            //this.htmlContent = this.new_mail.msg;
            //console.log(data);
          });
        })

      }


    } else {
      this.new = true;
    }
  }

}
