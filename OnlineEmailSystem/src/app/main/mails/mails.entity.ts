export interface Mail{
    mail_id:number;
    username:string,
    from:string;
    sub:string;
    msg:any;
    time:string;
    read:boolean;
    to:String;
    // path:String,
    // img :{ 
    //     path:String,
    //     data: any, 
    //     contentType: String 
    //  }
}