import { Navigationmodel } from "../models/Navigationmodel";

export class User 
{
    dom?: string='';
    branchID?: string='';
    userID?: number=-1;
    userName?: string='';
    userPassword?: string='';
    userPasswordRep?: string='';
    uMac?: string='';
    uAddr?: string='';
    uHostName?: string='';
    token?: string='';
    roleID?:string='';
    responseMessage?:string='';

    //register
    lName?:string='';
    fName?:string='';
    phoneNum?:string='';
    email?:string='';
    cusType?:string;
    csTypeName?:string='yy';
    regNum?:string='';
    regwtype?:number=-1;

    menus?:Navigationmodel[]=[];
    

}
