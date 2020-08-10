import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentcatiionRequest, AuthentcatiionService } from '../../shared/services/authentication.service';
import { ServerService } from '../../shared/services/server.service';
declare var $;

@Component({
  selector: 'app-sign1000',
  templateUrl: './sign1000.component.html',
  styleUrls: ['./sign1000.component.css']
})
export class Sign1000Component implements OnInit {

  userName: string;
  password: string;

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
  }

  ngOnDestroy(): void {
    $('body').removeClass('hold-transition login-page');
  }

  onClickLogin() {

    const authenticationObj: AuthentcatiionRequest = {
      username: this.userName,
      password: this.password
    };

    this.authentcatiionService.login(authenticationObj);
    
    /* 
    Utils.setSecureStorage( LOCAL_STORAGE.USER_INFO, userInfo);
    console.log(Utils.getSecureStorage( LOCAL_STORAGE.USER_INFO));
    const newAesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
    newAesInfo.timestamp = new Date().getTime();
    Utils.setSecureStorage(AES_INFO.STORE, newAesInfo);
    this.router.navigate(['/main/home']); */
  }

}
