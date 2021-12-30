export interface Register{
    username : string;
    password : any;
    confirmpassword : any;
    gender:string;
    dob:string;
    phone:string;
    token:string;
}

export interface Login {
    username : string;
    password : string;
    token:string;
}