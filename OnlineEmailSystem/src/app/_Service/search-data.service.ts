import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchDataService {
  private searchdata = new BehaviorSubject<string>("");
  public share = this.searchdata.asObservable();

  constructor() { }

  setsearchedData(data:string){
    this.searchdata.next(data);
  }
  // getsearchedData():string{

  //   //console.log(SearchDataService.searchedData);
  //   return this.searchdata;
  // }


}
