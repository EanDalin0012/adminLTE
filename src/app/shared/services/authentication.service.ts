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
      console.log('basic auth is undefind');
      credentail = {
        Username: 'spring-security-oauth2-read-write-client',
        password: 'spring-security-oauth2-read-write-client-password1234'
      };
    }

    if (!auth.client_id) {
      console.log('client id is undefind');
      auth.client_id = 'spring-security-oauth2-read-write-client';
    }

    if (!auth.grant_type) {
        console.log('grant-type is undefind');
        auth.grant_type = 'password';
    }

    const api = '/oauth/token';
    const uri = this.bizserverUrl + api;
    const btoa = 'Basic' + window.btoa(credentail.Username + ':' + credentail.password);

    const httpOptionsObj = {
      'Content-Type': 'application/json',
      Authorization: btoa
    };

    console.log(auth, credentail);
    this.httpClient.post(uri, JSON.stringify(auth), {
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
