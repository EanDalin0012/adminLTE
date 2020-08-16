import { ModalService } from 'src/app/shared/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse  } from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeout';
import * as $ from 'jquery';
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AES_INFO } from './../../shared/constants/common.const';
import { environment } from 'src/environments/environment';
import { Utils } from '../utils/utils.static';
import { LOCAL_STORAGE } from '../constants/common.const';

declare let CryptoJS: any;

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  private timeoutmillsec = 120000;
  private longtimeApis = ['MAN1006'];

 constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router,
    private zone: NgZone,
    private modal: ModalService,
    private modalService: ModalService,
  ) {

  }


  decrypt(plaintext, password) {
    return CryptoJS.AES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(plaintext.substring(32))
    }, CryptoJS.enc.Hex.parse(CryptoJS.SHA1(password).toString().substring(0, 32)),
    {
      iv: CryptoJS.enc.Hex.parse(plaintext.substring(0, 32)),
    }).toString(CryptoJS.enc.Utf8);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const url = (window.location.href).split('/');
    // console.log('url', url);
  //  if (url[3] === 'singin') {
  //    alert(1);
  //     Utils.removeSecureStorage(LOCAL_STORAGE.Authorization);
  //     Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
  //   }

    // tslint:disable-next-line:prefer-for-of
    for ( let idx = 0 ; idx < this.longtimeApis.length ; idx++ ) {
      if ( req.url.indexOf(this.longtimeApis[idx]) > 0 ){
        environment.production ? (() => '')() : console.log('timeout sec changed.');
        this.timeoutmillsec = 2 * 60 * 1000;
        break;
      }
    }

    // console.log('new headers', clonedRequest.headers.keys());
    return next.handle(req).timeout(this.timeoutmillsec)
    .map(event => {
      let apiname = req.url.split(environment.bizServer.context)[1];

      if (!apiname){
        apiname = req.url;
      }

      if (environment.encryptionUse) {
        const aesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
        if (event instanceof HttpResponse) {
          event = event.clone({ body: {
            header: event.body.header,
            body: JSON.parse(this.decrypt(event.body.body, aesInfo.aesKey))
          }});
        }

      }

      if (event instanceof HttpResponse){
        environment.production ? (() => '')() : console.log(' Response Code : ' + apiname);
        environment.production ? (() => '')() : console.log(event.body);
      }
      // "CBK_SES_001"
      return event;
    })
    .pipe(
      finalize(() => {
        environment.production ? (() => '')() : console.log('Communicate finish.');
        $('div.loading').addClass('none') ;
      })
    )
    .catch((error: HttpErrorResponse) => {
      console.log('error', error);

      $('div.loading').addClass('none');
      environment.production ? (() => '')() : console.log(req.url + ' reqeusting failed. ' );
      // console.log("Http Response Error");
      // console.log(error);
      let httpErrorCode;
      // if (error instanceof HttpErrorResponse) {
      if (error.status){
        httpErrorCode = error.status;
      } else {
        httpErrorCode = '999999';
      }


      console.log(error.status + ' : ' + error.statusText);
      environment.production ? (() => '')() : console.log(error.name + ' : ' + error.message);

      // if (error.status >= 400 && error.status < 500) {
      //     this.zone.run(() =>  this.router.navigate(['/error403']));
      //   } else if (error.status >= 500 && error.status < 500) {
      //     this.zone.run(() =>  this.router.navigate(['/error404']));
      //   } else {
      //     this.zone.run(() => this.router.navigate(['/neterror']));
      //   }
      if (error && error.status === 401) {
        this.modalService.alert({
          // tslint:disable-next-line:max-line-length
          title: error.error.error,
          content:  '<p>'+ error.error.error_description+'</p>',
          modalClass: [''],
          btnText: 'Confirm',
          callback: (res) => {
          }
        });
      } else if (error && error.error.status === 500) {
        this.modalService.alert({
          // tslint:disable-next-line:max-line-length
          content:  'message :<span class="message-alert">' + String(error.error.message).substr(0, 150) + '</span> <br/>status: <span class= "message-alert">' + error.error.status + '</span',
          modalClass: ['pop_confirm'],
          btnText: 'Confirm',
          callback: (res) => {
            return false;
          }
        });
      } else if (error && error.status === 0) {
          this.modalService.alert({
            content:  'message : <span>Connection faile</span> status: ' + error.statusText,
            modalClass: [''],
            btnText: 'Confirm',
            callback: (res) => {
              return false;
            }
          });
      }
      return Observable.of(new HttpResponse({body: { header: {result: false, resultCode: httpErrorCode }, body: {}} }));
    }) as any;
  }

  showErrMsg(msgKey: string){
    this.translate.get('COMMON.ERROR').subscribe( message => {
      if (msgKey === 'NOTLOGIN'){
        this.modal.alert({
          content : message[msgKey],
          callback : () => {
            this.zone.run(() =>  this.router.navigate(['/login']));
          }
        });
      } else {
        this.modal.alert({
          content : message[msgKey]
        });
      }
    });
  }
}
