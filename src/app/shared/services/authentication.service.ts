import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalService } from './modal.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentcatiionService {
  private bizserverUrl: string;

  constructor(
    private httpClient: HttpClient,
    private modalService: ModalService,
    private router: Router
  ) {
    this.bizserverUrl = environment.bizMOBServer;
  }

  public login(auth: AuthentcatiionRequest, basicAuth?: BasicAuth) {

    let credentail: BasicAuth;
  
    if (!basicAuth) {
      credentail = {
        Username: 'spring-security-oauth2-read-write-client',
        password: 'spring-security-oauth2-read-write-client-password1234'
      };
    }

    auth.client_id = 'spring-security-oauth2-read-write-client';
    auth.grant_type = "password";
    auth.username = 'admin';
    auth.password = 'admin1234';

    const api = '/oauth/token';
    const uri = this.bizserverUrl + api;
    const btoa = 'Basic ' + window.btoa(credentail.Username + ':' + credentail.password);
    // test
    const httpOptionsObj = {
      "Authorization": btoa
    };

    const formData = new FormData();
    formData.append('client_id', 'spring-security-oauth2-read-write-client');
    formData.append('grant_type', 'password');
    formData.append('username', 'admin');
    formData.append('password', 'admin123');

    this.httpClient.post(uri, formData, {
      headers: new HttpHeaders(httpOptionsObj)
    }).subscribe(response => {

        console.log('response data from AuthenticationService ', response);
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
