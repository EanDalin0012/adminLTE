import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentcatiionRequest, AuthentcatiionService } from '../../shared/services/authentication.service';
import { ServerService } from '../../shared/services/server.service';
import { Utils } from '../../shared/utils/utils.static';
declare var $;

@Component({
  selector: 'app-sign1000',
  templateUrl: './sign1000.component.html',
  styleUrls: ['./sign1000.component.css']
})
export class Sign1000Component implements OnInit {

  userName: string;
  password: string;
  rememberMe: boolean = false;
  theCheckbox= false;
  accountLocked =true;
  @ViewChild('passwordElement') passwordElement: ElementRef;

  constructor(
    private router: Router,
    private serverService: ServerService,
    private authentcatiionService: AuthentcatiionService
  ) {
  }

  ngOnInit() {
    $('body').addClass('hold-transition login-page');
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });
    this.rememberMe = Utils.getSecureStorage('rememberMe');
    if(this.rememberMe === true) {
      this.userName = Utils.getSecureStorage('UserID');
    }
  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

  onClickLogin() {
    if(this.rememberMe === true) {
      Utils.setSecureStorage('UserID', this.userName)
    }

    const authenticationObj: AuthentcatiionRequest = {
      username: this.userName,
      password: this.password
    };
    this.authentcatiionService.login(authenticationObj);
  }

  enterLoginHandler(event: any) {
    if (event.keyCode === 13 && this.userName !== '' && this.password !== '') {
      this.onClickLogin();
    } else if (event.keyCode === 13 && this.userName !== '') {
      this.passwordElement.nativeElement.focus();
    }
  }

  tapfocus(event: any) {
    const element = event.srcElement.nextElementSibling;
    if (event.keyCode === 9) {
      element.focus();
    }
  }
  
  clickRememberMe() {
    alert();
    console.log(this.userName);
    if(this.userName !== '') {
      Utils.setSecureStorage('rememberMe', this.rememberMe);
      Utils.setSecureStorage('UserID', this.userName)
    }
  }

  toggleVisibility(e){
    alert(e.target.checked);
  }

  test() {
    alert();
  }
}
