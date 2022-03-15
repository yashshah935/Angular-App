import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSent'
})
export class HighlightSentPipe implements PipeTransform {

  transform(text: string, search:string): string {

    const regex = new RegExp(search,'gi'); //gi for case insensitive search

    const match = text.match(regex);

    if(match){
      let newstring = text.replace(regex,`<span class="emailRow__title text-dark bg-warning"><i><b><u>${match[0]}</u></b></i></span>`);
      return newstring;
    }

    return text;
  }


}
