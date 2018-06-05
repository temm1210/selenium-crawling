import { MemberMessage } from './../model/MemberMessage';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import { SignupComponent } from '../signup/signup.component';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private id: string;
  private password: string;
  private loginSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
 
  onSubmit(form: User) {
    this.loginSubscription = this.authService
    .login(form)
    .subscribe(
      (data: MemberMessage) => {
        if(data.result) {
          this.authService.setInfoToSessionStrage('user',{id: this.id, token: data.msg});
          this.closeDialog();
        }
        else{window.alert("회원정보가 올바르지 않습니다. 다시확인해주세요．")}
      }
    );
  }

  closeDialog() {
    this.dialogRef.close(this.id);
  }

  openSignUpDialog() {
    this.dialog.open(SignupComponent,{
      width:'450px'
    });
    this.closeDialog();
  }
}
