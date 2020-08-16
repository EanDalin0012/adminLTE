import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RequestDataService } from './get-data.service';
import { Utils } from '../utils/utils.static';
import { LOCAL_STORAGE } from '../constants/common.const';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentcatiionService {
  private bizserverUrl: string;

  constructor(
    private httpClient: HttpClient,
    private modalService: ModalService,
    private router: Router,
    private dataService: RequestDataService,
    private translate: TranslateService
  ) {
    this.bizserverUrl = environment.bizMOBServer;
  }

  public login(auth: AuthentcatiionRequest, basicAuth?: BasicAuth) {

    if(!auth.username || auth.username === null) {
      this.modalService.alert({
        content: this.translate.instant('COMMON.MESSAGE.InValid_User_Name'),
        btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
        callback: res => {

        }
      });
      return;
    }

    let credentail: BasicAuth;
  
    if (!basicAuth) {
      credentail = {
        Username: 'spring-security-oauth2-read-write-client',
        password: 'spring-security-oauth2-read-write-client-password1234'
      };
    } else {
      credentail = basicAuth;
    }

    const api = '/oauth/token';
    const uri = this.bizserverUrl + api;
    const btoa = 'Basic ' + window.btoa(credentail.Username + ':' + credentail.password);

    const httpOptionsObj = {
      "Authorization": btoa
    };

    const formData = new FormData();
    formData.append('client_id', 'spring-security-oauth2-read-write-client');
    formData.append('grant_type', 'password');
    formData.append('username', auth.username);
    formData.append('password', auth.password);

    this.httpClient.post(uri, formData, {
      headers: new HttpHeaders(httpOptionsObj)
    }).subscribe(_response => {
        console.log('response data from AuthenticationService ', _response);
        Utils.setSecureStorage(LOCAL_STORAGE.Authorization, _response);
        if(_response) {
          this.dataService.requestUserInfo(auth.username).then(response =>{
            Utils.setSecureStorage(LOCAL_STORAGE.Authorization, response);
          });
        }
    });
  }
}


export interface BasicAuth {
  Username: string;
  password: string;
}

export interface AuthentcatiionRequest {
  grant_type?: string;
  username: string;
  password: string;
  client_id?: string;
}
