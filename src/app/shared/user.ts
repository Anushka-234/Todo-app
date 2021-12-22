export interface Register{
    username : string;
    password : string;
    confirmpassword : string;
    address : {
        postal : string;
        city : string;
        state : string;
    }
    token:string;
}

export interface Login {
    username : string;
    password : string;
    token:string;
}