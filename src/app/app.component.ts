import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, LANGUAGE } from './shared/constants/common.const';
import { Utils } from './shared/utils/utils.static';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminLTE';
  constructor(
    private translate: TranslateService,
    private router: Router
  ) {
    this.setInitialAppLanguage();
    if (Utils.getSecureStorage(LOCAL_STORAGE.USER_INFO) === null) {
      this.router.navigate(['/login']);
    }
  }

  setInitialAppLanguage() {
    const localLangCode = Utils.getSecureStorage( LOCAL_STORAGE.LANGUAGE_CODE );
    const i18n = Utils.getSecureStorage( LOCAL_STORAGE.I18N );
    if ( !i18n || !localLangCode ) {
      this.translate.setDefaultLang( LANGUAGE.I18N_EN.toString() );
      this.translate.use( LANGUAGE.I18N_EN.toString() );
    } else {
      this.translate.setDefaultLang( i18n );
      this.translate.use( i18n );
    }
  }
}
