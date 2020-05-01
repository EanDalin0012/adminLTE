import { Injectable } from '@angular/core';
import { Utils } from '../utils/utils.static';
import { AES_INFO } from '../constants/common.const';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) {}
  public setLastEventTime(): void {
    Utils.setSecureStorage('lastEventTime', String(new Date().getTime()));
  }

  public isEventTimeOver(time?: number): boolean {
    const lastEventTime = Number(Utils.getSecureStorage('lastEventTime'));

    if (lastEventTime) {
      return new Date().getTime() - lastEventTime > (time || environment.autoLogoutTime);
    } else {
      return undefined;
    }
  }

  public logout() {
    Utils.removeSecureStorage(AES_INFO.STORE);
    Utils.removeSecureStorage('USER_INFO');
    this.router.navigate(['/login']);
  }

  public hasSession(): boolean {
    return true;
    if (!this.isEventTimeOver() ) {
        if (Utils.getSecureStorage('USER_INFO')) {
          return true;
        } else {
          return false;
        }
    } else {
      return false;
    }
  }
}
