import { MemberMessage } from './../model/MemberMessage';
import { AuthService } from './../service/auth.service';
import { FormGroup, FormGroupDirective, FormControl, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class CustomValidators{
    static equalValidator: ValidatorFn = ({value}: FormGroup) => {
        let [frist, ...rest] = Object.keys(value || {});
        let valid = rest.every(key => value[key] === value[frist]);
        return valid? null: {equal:true};
    }
}
  
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.parent.invalid && (control.touched || control.dirty);
    }
}

export class ElementMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.invalid && (control.touched || control.dirty);
    }
}
