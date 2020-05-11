import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gender, LOCAL_STORAGE, AES_INFO } from 'src/app/shared/constants/common.const';
import { Utils } from 'src/app/shared/utils/utils.static';
import { User } from 'src/app/shared/Class/class-user';
declare var $;

@Component({
  selector: 'app-sign1000',
  templateUrl: './sign1000.component.html',
  styleUrls: ['./sign1000.component.css']
})
export class Sign1000Component implements OnInit {

  constructor(
    private router: Router
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
    const userInfo = new User();
    userInfo.id = 1;
    userInfo.firstName = 'dalin',
    userInfo.lastName = 'ean';
    userInfo.age      = 12;
    userInfo.birtDate = '20201010';
    userInfo.createBy = 1;
    userInfo.modifyBy = 1;
    userInfo.email = 'eandalined@gmail.com';
    userInfo.imgId = 1;
    userInfo.phone = '096655879';
    userInfo.gender = Gender.FEMALE;
    userInfo.modifyDate = '20201010';

    Utils.setSecureStorage( LOCAL_STORAGE.USER_INFO, userInfo);
    console.log(Utils.getSecureStorage( LOCAL_STORAGE.USER_INFO));
    const newAesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
    newAesInfo.timestamp = new Date().getTime();
    Utils.setSecureStorage(AES_INFO.STORE, newAesInfo);
    this.router.navigate(['/main/home']);
  }

}
