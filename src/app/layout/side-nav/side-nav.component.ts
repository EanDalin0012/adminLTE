import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { URLCODE } from 'src/app/shared/constants/common.const';
import { environment } from 'src/environments/environment';
declare var $;
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  modal;

  class: string;
  path: string;
  constructor(
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private modalService: ModalService,
  ) {
  }
  timeCheckInterval: any;
  ngOnInit() {
    $(document).ready(() => {
      $('.sidebar-menu').tree();
    });
    console.log('fdkaflkd');
    this.class = 'home';
    this.dataService.visitData.subscribe(message => {
      if (message !== '') {
        // ExpressionChangedAfterItHasBeenCheckedError로 인하여 setTimeout으로 우회처리
        setTimeout(() => {
          this.path = message;
          console.log(message);
          this.setVisitList(message);
        });
      }
    });
    this.authService.setLastEventTime();
    this.timeCheckInterval = setInterval(() => {
      if (location.pathname !== '/login' && this.authService.isEventTimeOver(environment.autoLogoutTime)) {
        clearInterval(Number(this.timeCheckInterval));
        this.modalService.closeAllDialog();

        // this.bizServer.PPCBHTTPpost("signout", {}).subscribe();
        this.router.navigate(['/login']);
        this.authService.logout();
        // Timeout
        this.modalService.alert({
          content: 'For security reason, sessions end after 10 minutes of inactivity.\n' +
          'Your are required to sign in if  you wish to continue to use our services.\n' +
          'Thank you for using.',
        callback: () => {
        }
        });
      }
    }, 60000);
  }

  ionViewWillEnter() {

  }
  setVisitList(path: string) {
    // console.log(path);
    // 일부 URL Path가 common.const의 값과 달라서 변환처리
    switch (path) {
      case 'accountinquirydeposit':
        path = 'accountinquiry';
        break;
      case 'accountinquiryloan':
        path = 'accountinquiry';
        break;
    }

    // const menuCode = MENUCODE2[path];
    // if (!!menuCode) {
    //   const reqTr1006 = new GNB1006Req(LANGUAGE[this.translate.currentLang]);
    //   reqTr1006.body.userID = this.userInfo.userID;
    //   reqTr1006.body.visitedMenuCode = menuCode;
    //   reqTr1006.body.channelTypeCode = CHANNEL.CIB;
    //   // /GNB1003
    //   // console.log(reqTr1006);
    //   this.bizServer.nPgPPCBHTTPpost("GNB1006", reqTr1006).subscribe(data => {
    //     const resTr1006 = data as GNB1006Res;
    //     if (this.bizServer.checkResponse(resTr1006)) {
    //     }
    //   });
    // } else {
    //   environment.production ? (() => '')() : console.error( '%c GNB1006 = Error path: ' + path, 'color: red; font-weight: bold;' );
    // }
  }

  onOpenPage(urlCode: any) {
    let url = '/main/';
    switch (urlCode) {
      case 'register1000':
        url += 'register/' + URLCODE.Register1000;
        break;
      case 'register2000':
          url += 'register/' + URLCODE.Register2000;
          break;
      case 'register3000':
        url += 'register/' + URLCODE.Register3000;
        break;
      case 'register4000':
        url += 'register/' + URLCODE.Register4000;
        break;
      case 'register5000':
          url += 'register/' + URLCODE.Register5000;
          break;
      case 'Import1000':
        url += 'imports/' + URLCODE.Register5000;
        break;
      case 7000:
      case 9100:
      case 9000:
      case 2000:
      case 3000: // setting
        url += `home/${URLCODE[urlCode]}`;
        break;
    }
    // console.log(url);
    this.router.navigate([url]);
  }

}
