import { Injectable } from '@angular/core';
import { Mail} from '../main/mails/mails.entity' ;
import { HttpClient, HttpHandler, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})


export class MailServiceService {
  private url = "http://localhost:8000/mail"
  //id:number=3;
  public Mail_list:Mail[]=[]; 
  constructor(private httpClient:HttpClient){
    
   
    }
 
  public Mailread(id_mail:Number){
    return this.httpClient.post<any>(this.url + "/" + id_mail+"/read",httpOptions);
  }

  
  
  public postDraft(mail:Mail):Observable<any>{
    //console.log(mail);
    return this.httpClient.post<any>(this.url+"/draft",mail,httpOptions);
  }
  public putDraft(mail:Mail):Observable<any>{
    return this.httpClient.put<any>(this.url+"/draft",mail,httpOptions);

  }
  public deleteDraft(id_mail:Number){
    return this.httpClient.delete<any>(this.url + "/" + id_mail+"/draft");

  }
  public postMail(mail:Mail):Observable<any>{
    console.log(mail)
      return this.httpClient.post<any>(this.url,mail,httpOptions);
  }
  public getMails():Observable<Mail[]>{
    return this.httpClient.get<Mail[]>(this.url);
  }
  public getDrafts():Observable<Mail[]>{
    return this.httpClient.get<Mail[]>(this.url+"/draft");
  }
  public getmail(id_mail:Number):Observable<any>{
    return this.httpClient.get<HttpResponse<any>>(this.url + "/" + id_mail)
    
  }
  public getDraft(id_mail:Number):Observable<any>{
    return this.httpClient.get<HttpResponse<any>>(this.url + "/" + id_mail+"/draft")
    
  }
  
  
}

