import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MainCategory } from '../Class/class-main-category';
import { ModalService } from './modal.service';


@Injectable({
  providedIn: 'root'
})

export class IsValidModelService {

  constructor(
    private translate: TranslateService,
    private modalService: ModalService) {}


  public isValidMainCategory(mainCategory: MainCategory): Promise<boolean> {
    return new Promise( (resolve) => {
      if (!mainCategory.name || mainCategory.name === undefined) {
          this.alertMessage(this.translate.instant('Home7100.MESSAGE_ERROR.MAIN_CATEGORY_REQUEIRED')).then( rest => {
            resolve(rest);
          });
      } else {
        resolve(true);
      }
    });
  }

  private alertMessage(msg: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.modalService.alert({
        content: msg,
        btnText: this.translate.instant('COMMON.BUTTON.CONFIRME'),
        modalClass: [],
        callback: rest => {
          resolve(false);
        }
      });
    });
  }

}

