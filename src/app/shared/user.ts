export interface Register{
    username : string;
    password : any;
    confirmpassword : any;
    address : {
        postal : any;
        city : string;
        state : string;
    }
}

export interface Login {
    username : string;
    password : any;
}