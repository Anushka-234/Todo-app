export class Register{
    username : string;
    password : string;
    confirmpassword : string;
    gender:string;
    dob:string;
    phone:string;
    token:string;
    showsetpassword:boolean;
    email:string;
}

export interface Login {
    username : string;
    password : string;
    token:string;
}