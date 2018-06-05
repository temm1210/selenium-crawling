import { AuthService } from './../service/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  image: string;
  userName: string;
  isLoggined: boolean = false;

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.image = "../assets/navbar.jpg";
    this.loginSubscribe();
  }

  loginSubscribe() {
    this.authService.sessionObservable$.subscribe(
      (data:string) => {
        this.isLoggined = (data === null ? false : true); 
        this.userName = data;  
      }
    );
  }

  logOut() {
    if(window.confirm("로그아웃 하시겠습니까？")){
      this.authService.delSessionStorageItem('user');
    }
  }

  //dialog method
  signUpDialog() {
    this.openDialog(SignupComponent,{width:'450px'});
  }

  loginDialog() {
    let dialogRef = this.openDialog(LoginComponent,{width: '450px',data: {}});
    dialogRef.afterClosed().subscribe( result => this.userName = result);
  }

  openDialog(component: any, config:object={}): MatDialogRef<any> {
    return this.dialog.open(component,config)
  }
}
