import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, ErrorStateMatcher } from '@angular/material';
import {CustomValidators, ConfirmValidParentMatcher} from '../validators/custom-validator';
import { AuthService } from '../service/auth.service';
import { MemberMessage } from '../model/MemberMessage';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  form: FormGroup;

  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  getIdSubscription: Subscription;
  signUpSubscription: Subscription;

  isExist:boolean = false;

  constructor(
    private authService: AuthService,
    private dialogRef:MatDialogRef<SignupComponent>, 
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data:any
  ) { }

  ngOnInit() {
    this.formMake();
  }

  //컴포넌트 close시 구독취소
  ngOnDestroy() {
    if(this.getIdSubscription !== null)
      this.getIdSubscription.unsubscribe();
  }

  //초기폼 설정
  formMake() {
    this.form = this.fb.group({
      id: ['',[Validators.required,Validators.minLength(3)]],
      passwordGroup: this.fb.group({
        password: ['',[Validators.required, Validators.minLength(5)]],
        passwordConfirm: ['',Validators.required]
      },{validator: CustomValidators.equalValidator})
    })
  }

  //아이디 입력 후 포커스 이동하면 아이디검사
  focusOut(){
    this.getIdSubscription = this.authService
      .getId(this.form.get("id").value)
      .subscribe((message: MemberMessage) => { 
        this.isExist = message.result;
      });
  }

  //Dialog닫기
  closeDialog() {
    this.dialogRef.close();
  }

  //회원가입 클릭시
  onSubmit() {
    if(this.form.valid && !this.isExist){
      this.signUpSubscription = this.authService.signUp({
          id: this.form.get("id").value,
          password: this.form.get("passwordGroup.password").value
        }
      )
      .subscribe( 
        (message: MemberMessage) => {
          window.alert(message.msg);
          this.signUpSubscription.unsubscribe();
          this.closeDialog();  
        }
      )
    } else {
      window.alert("모두 올바르게 입력하셔야 합니다");
    }//else
  }//onSubmit()

}