export interface Register{
    username : string;
    password : string;
    confirmpassword : string;
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