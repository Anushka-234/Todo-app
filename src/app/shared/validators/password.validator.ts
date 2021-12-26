// import { AbstractControl } from "@angular/forms";

// export function passwordValidator(control: AbstractControl): {[key:string]:boolean} | null{
//     const password = control.get('password');
//     const confirmpassword = control.get('confirmpassword');
//     if (password?.pristine || confirmpassword?.pristine){
//         return null;
//     }
//     return password && confirmpassword && password.value !== confirmpassword.value ? { 'mismatch': true} : null;

// }

import { AbstractControl, FormGroup } from '@angular/forms';

export function PasswordMatch(controlName: string, matchingControlName: string){
    return ( fg : FormGroup) => {
        const control = fg.controls[controlName];
        const matchingControl = fg.controls[matchingControlName];

        if(matchingControl.errors && !matchingControl.errors['mustMatch']){
            // return if another validator has already found an error on the matchingControl
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true })
        } else {
            matchingControl.setErrors(null);
        }
    }
}
