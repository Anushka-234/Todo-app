
import { AbstractControl, FormGroup,ValidationErrors, ValidatorFn  } from '@angular/forms';

export function PasswordMatch(controlName: string, matchingControlName: string){
    return ( fg : FormGroup) => {
        const control = fg.controls[controlName];
        const matchingControl = fg.controls[matchingControlName];

        if(matchingControl.errors && !matchingControl.errors['mustMatch']){
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true })
        } else {
            matchingControl.setErrors(null);
        }
    }
}

