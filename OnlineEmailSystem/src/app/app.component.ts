import { AuthService } from './_Service/auth.service';
import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'OnlineEmailSystem';
  value:any = "Hello";
  public emplist:any = []
  ngOnInit(){}
  
  constructor(){}
  
}


