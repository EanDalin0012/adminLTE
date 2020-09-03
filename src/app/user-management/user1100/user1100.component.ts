import { Component, OnInit } from '@angular/core';
import { UserAccountRequest } from '../../shared/class-tr/classtr-req-user-account';
import { ServerService } from '../../shared/services/server.service';
import { UserAccountRespnonse } from '../../shared/class-tr/classtr-res-user-account';
import { BTN_ROLES } from '../../shared/constants/common.const';

@Component({
  selector: 'app-user1100',
  templateUrl: './user1100.component.html',
  styleUrls: ['./user1100.component.css']
})
export class User1100Component implements OnInit {

  modal;
  enabled: boolean;
  accountExpired: boolean;
  credentialsExpired: boolean;
  accountLocked: boolean;
  userName: string;
  id: number;

  constructor(
    private service: ServerService
  ) { }

  ngOnInit(): void {
    if (this.modal) {
      this.enabled             = this.modal.message.enabled;
      this.accountExpired     = this.modal.message.account_expired;
      this.accountLocked        = this.modal.message.account_locked;
      this.credentialsExpired = this.modal.message.credentials_expired;
      this.userName           = this.modal.message.user_name;
      this.id                 = this.modal.message.id;
    }
  }

  close() {
    this.modal.close();
  }

  save() {
    const trReq = new UserAccountRequest();
    trReq.body.accountExpired     = this.accountExpired;
    trReq.body.enabled            = this.enabled;
    trReq.body.accountLocked      = this.accountLocked;
    trReq.body.credentialsExpired = this.credentialsExpired;
    trReq.body.userName           = this.userName;
    trReq.body.id                 = this.id;
    console.log(trReq);
    const api = '/api/user/account/update';
    this.service.HTTPRequest(api, trReq).then(resp => {
      const response   = resp as UserAccountRespnonse;
      if (response.body.isSuccessYN === 'Y') {
        this.modal.close({close: BTN_ROLES.EDIT});
      }
    });
  }

  test() {
    alert();
  }
}
