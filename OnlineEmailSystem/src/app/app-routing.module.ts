import { LoginTemplateComponent } from './login-template/login-template.component';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes,RouterModule } from '@angular/router';
import { HeadComponent } from './_Layout/head/head.component';
import { InboxComponent } from './main/inbox/inbox.component';
import { SentComponent } from './main/sent/sent.component';
import { DraftComponent } from './main/draft/draft.component';
import { ContentComponent } from './content/content.component';
import { ComposeComponent } from './compose/compose.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { EmailgeneratorComponent } from './emailgenerator/emailgenerator.component';
import { MainComponent } from './main/main.component';

const routes:Routes=[
  {
    path:'',
    component: LoginTemplateComponent,
    pathMatch:'full'
  },
  {
    path:'register',
    component:LoginComponent,
  },
  // {
  //   path:'main/inbox',
  //   component:InboxComponent,
  // },
  {
    path:'main',
    component:HeadComponent,
    children:[
      {
        path:'inbox',
        component:InboxComponent
      },{
        path:'sent',
        component:SentComponent
        
      },{
        path:'draft',
        component:DraftComponent
      },
      {
        path:'page_content/:id',
        component:ContentComponent
      },
      {
        path :'draft/:id/:title',
        component:ComposeComponent
      },
      {
        path:'forward/:id/:title',
        component:ComposeComponent
      },
      {
        path:'compose',
        component:ComposeComponent
      }
    ]
    ,
    canActivate:[AuthGuard]
  },
  // {
  //   path:'main/inbox',
  //   component:InboxComponent,
  //   canActivate:[AuthGuard]
  // },{
  //   path:'main/sent',
  //   component:SentComponent,
  //   canActivate:[AuthGuard]
  // },{
  //   path:'main/draft',
  //   component:DraftComponent,
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path:'main/page_content/:id',
  //   component:ContentComponent,
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path:'forward/:id',
  //   component:ComposeComponent,
  //   canActivate:[AuthGuard]
  // },
  // {
  //   path:'main/compose',
  //   component:ComposeComponent,
  //   canActivate:[AuthGuard]
  // },
  {
    path:'emailgenerator',
    component:EmailgeneratorComponent
  },
  {
    path:'',
    component: LoginTemplateComponent,
    pathMatch:'full'
  },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
