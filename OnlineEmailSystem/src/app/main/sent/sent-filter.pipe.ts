import { Pipe, PipeTransform } from '@angular/core';
import { Mail } from '../mails/mails.entity';
@Pipe({
  name: 'sentFilter'
})
export class SentFilterPipe implements PipeTransform {

  transform(mail_list:Mail[],searchTerm?:string,elment ?: any): Mail[]{

    if(!mail_list || !searchTerm){
      return mail_list;
    }
    else{

      mail_list = this.highlightFilter(mail_list,searchTerm);
      return mail_list;


    }
  }

  highlightFilter(mail_list:Mail[],searchTerm:string) : Mail[]{
    var Mails:Mail[]=[];
    //var matchFlag : string = "g"; //case insensitive


    mail_list.forEach(function(mail){
      let startIndex = mail.username.toLowerCase().indexOf(searchTerm.toLowerCase());
      if(startIndex != -1){

        const regex = new RegExp(searchTerm,'gi'); //gi for case insensitive search
        const match = mail.username.match(regex);
        if(match){
          mail.username.replace(regex,`<span appHighlight>${match[0]}</span>`);
        }
        Mails.push(mail);
      }


    });
    return Mails;
  }


}
