
import { LOCAL_STORAGE } from '../constants/common.const';
import { User } from '../Class/class-user';

export abstract class Utils {

    public static getUserInfo(): User {
      return  JSON.parse(window.localStorage.getItem(LOCAL_STORAGE.USER_INFO)) as User;
    }

    public static setSecureStorage( sKey: string, oValue: any ) {
      oValue = this.stringjson(oValue);
      window.localStorage.setItem(sKey, oValue);
    }

    static stringjson(oValue: any): any {
      const value =  oValue !== undefined && oValue !== null ? JSON.stringify(oValue) : '';
      return value;
    }

    public static getSecureStorage( sKey: string ): any {
      let data = window.localStorage.getItem(sKey);
      data = this.parsejson(data);
      return data;
    }

    static parsejson(data) {
      let retValue;
      if ( data !== undefined && data !== '') {
        retValue = JSON.parse(data);
      } else {
          retValue = data;
      }
      return retValue;
    }

    public static removeSecureStorage(sKey: string) {
      window.localStorage.removeItem(sKey);
    }

   // 100 - ( 15 / 100)
}
