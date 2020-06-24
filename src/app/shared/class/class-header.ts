
import { Utils } from '../utils/utils.static';
import { CHANNEL, LANGUAGE } from '../constants/common.const';

export class Header {
  msg = '';
  sessionId = '';
  authData = '';
  userID = 0;
  languageCode = '';
  channelTypeCode = '';
  result = true;

  constructor(
    ) {
      this.channelTypeCode = CHANNEL.ADMIN;
      this.languageCode = this.getI18N();
      console.log('localLangCode', this.languageCode);
      const userinfo = Utils.getSecureStorage('userInfo');
      if (userinfo) {
            this.userID = userinfo.id;
      }
    }

    getI18N(): string {
      const langCode = Utils.getSecureStorage( 'langCode' ) || 'en';
      if (langCode === LANGUAGE.I18N_EN) {
        return LANGUAGE.EN;
      } else if (langCode === LANGUAGE.I18N_KM) {
        return LANGUAGE.KM;
      } else if (langCode === LANGUAGE.I18N_KO) {
        return LANGUAGE.KO;
      } else if (langCode === LANGUAGE.I18N_JA) {
        return LANGUAGE.JA;
      } else if (langCode === LANGUAGE.I18N_ZH) {
        return LANGUAGE.ZH;
      }
    }
}
