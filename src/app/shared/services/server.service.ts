import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery';
import { ModalService } from './modal.service';
import { Header } from '../Class/class-header';
import { Utils } from '../utils/utils.static';
import { AES_INFO, LOCAL_STORAGE } from '../constants/common.const';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ServerService {
  modal;
  private bizserverUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  header: Header;
  constructor(
    private httpClient: HttpClient,
    private modalService: ModalService,
    private router: Router
  ) {
    // this.bizserverUrl = environment.bizMOBServer + '/bizmob.iocare/';
    this.bizserverUrl = environment.bizMOBServer;
  }

  public HTTPGet(api): Promise<any> {
   return new Promise((resolve, reject) => {
    $('div.loading').addClass('none');

    const uri = this.bizserverUrl + api;
    this.httpClient.get(uri, this.httpOptions).subscribe(rest => {
      resolve(rest);
      $('div.loading').removeClass('none');
    });

   });
  }

  public HTTPRequest(api, TrClass: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const aesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
      console.log(aesInfo.timestamp);
      if (aesInfo && new Date().getTime() - aesInfo.timestamp > environment.autoLogoutTime) {

        if (this.modal) {
          this.modal.close();
        }

        this.modalService.alert({
          content: 'For security reason, sessions end after 10 minutes of inactivity.\n' +
            'Your are required to sign in if  you wish to continue to use our services.\n' +
            'Thank you for using.',
          callback: () => {
            $('kendo-dialog').remove();
            Utils.removeSecureStorage(LOCAL_STORAGE.USER_INFO);
            this.router.navigate(['/login']);
          }
        });
      } else {
        $('div.loading').addClass('none');
        $('body').removeClass('loaded');
        const httpOptionsObj = {
          'Content-Type': 'application/json'
        };
        const uri = this.bizserverUrl + api;
        this.httpClient.post(uri, JSON.stringify(TrClass), {
          headers: new HttpHeaders(httpOptionsObj)
        }).subscribe( res => {
          const newAesInfo: any = Utils.getSecureStorage(AES_INFO.STORE) || {};
          newAesInfo.timestamp = new Date().getTime();
          Utils.setSecureStorage(AES_INFO.STORE, newAesInfo);
          $('body').addClass('loaded');
          $('div.loading').removeClass('none');
          const result = res as any;
          if (this.checkResponse(result.header) === true) {
            resolve(res);
          } else {
            resolve(result.header);
          }
        });
      }

    });
   }


  public PPCBHTTPget(api) {
    const uri = this.bizserverUrl + api;
    this.httpClient.get(uri, this.httpOptions).subscribe(rest => {
    });
  }

  public checkResponse(header: Header): boolean {
      if (header) {
        if ( header.result === false) {
          this.modalService.alert({
            content: header.msg,
            modalClass: [''],
            btnText: 'Confirm',
            callback: (res) => {
              return false;
            }
          });
        } else {
          return true;
        }
      }
  }

  // public checkResponse(header: Header): boolean {
  //   return header.result;
  // }

}
