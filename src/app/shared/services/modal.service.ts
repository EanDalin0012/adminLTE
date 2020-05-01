import { Injectable } from '@angular/core';
import { DialogService, DialogRef, DialogCloseResult } from '@progress/kendo-angular-dialog';


import * as $ from 'jquery';
// import { NotificationService } from '@progress/kendo-angular-notification';
import { Store } from '../Class/class-store';
import { MODAL_STORE_KEY } from '../constants/common.const';
import { ModalDataService } from '../component/modal.service';
import { ModalComponent } from '../component/modal/modal.component';
import { SBSharedModule } from '../sbshare.module';

@Injectable({
  providedIn: SBSharedModule
})
export class ModalService {

  store = new Store();
  dialogRefList: DialogRef[] = [];
  i = 0;
  constructor(
    private dialogService: DialogService,
    private modalData: ModalDataService,
    // private notificationService: NotificationService
  ) { }

  /**
   * modal
   * @param content (string)
   * @param btnText (string)
   * @param modalClass (array) Modal Component
   * @param height (number) Modal Kendo ui
   * @param width (number) Modal  Kendo ui
   * @param minWidth (number) Modal Kendo ui
   */
  notice({ content = '', btnText = 'OK', modalClass = [], height = 0, width = 0, minWidth = 0 }) {
    let contentComponent: any;

    if (typeof content === 'string') {
      this.modalData.sendMessage(content.replace(/\n/gi, '<br/>'));
      contentComponent = ModalComponent;
    } else {
      contentComponent = content;
    }

    this.dialogService.open({
      content: ModalComponent,
      actions: [{
        text: btnText
      }],
      height,
      width,
      minWidth
    });

    /**
     * Modal
     */
    $('kendo-dialog').addClass(modalClass);
  }

  /**
   * modal
   * @param title (string) modal
   * @param content (string)
   * @param btnText (string)
   * @param modalClass (array) Modal Component
   * @param callback (function)
   * @param height (number) Modal
   * @param width (number) Modal
   * @param minWidth (number) Modal
   */
  alert({ title = '', content, btnText = 'OK', modalClass = [], callback = (res: any) => {}, height = 0, width = 0, minWidth = 0 }) {
    let contentComponent: any;

    if (typeof content === 'string') {
      // Base Component
      this.modalData.sendMessage(content.replace(/\n/gi, '<br/>'));
      contentComponent = ModalComponent;
    } else {
      contentComponent = content;
    }

    const dialog: DialogRef = this.dialogService.open({
      title,
      content: contentComponent,
      actions: [{
        text: btnText
      }],
      height,
      width,
      minWidth
    });

    /**
     * Modal
     */
    $('kendo-dialog').addClass(modalClass);
    $('kendo-dialog').addClass('addAlert');
    $('.addAlert').eq(-1).addClass('addAlertCender');
    $('.addAlertCender').find('kendo-dialog-actions').addClass('alert-btn');
    dialog.result.subscribe((res) => {
      if (res instanceof DialogCloseResult) {
        callback(false);
      } else {
        callback(res);
      }
    });

  }

  /**
   * Confirm
   * @param title (string) modal
   * @param content (string)
   * @param lBtn (object)
   * @param lBtn.btnText (string)
   * @param lBtn.callback (function)
   * @param rBtn (object)
   * @param rBtn.btnText (string)
   * @param rBtn.callback (function)
   * @param modalClass (array) Modal Component
   * @param callback (function) modal이 close
   * @param height (number) Modal Kendo ui
   * @param width (number) Modal  Kendo ui
   * @param minWidth (number) Modal Kendo ui
   */
  confirm({
    title = '',
    content,
    lBtn = {},
    rBtn = {},
    modalClass = [],
    callback = (res: any) => {},
    height = 0,
    width = 0,
    minWidth = 0
  }) {
    const lBtnText = lBtn['btnText'] || 'No';
    const lBtnCallback = lBtn['callback'] || function() {};

    const rBtnText = rBtn['btnText'] || 'Yes';
    const rBtnCallback = rBtn['callback'] || function() {};

    let contentComponent: any;

    if (typeof content === 'string') {
      // Base Component
      this.modalData.sendMessage(content.replace(/\n/gi, '<br/>'));
      contentComponent = ModalComponent;
    } else {
      contentComponent = content;
    }

    const dialog: DialogRef = this.dialogService.open({
      title,
      content: contentComponent,
      actions: [{
        text: lBtnText
      }, {
        text: rBtnText
      }],
      height,
      width,
      minWidth
    });

    $('kendo-dialog').addClass(modalClass);

    dialog.result.subscribe((res) => {
      if (res instanceof DialogCloseResult) {
        callback(false);
      } else {
        switch (res.text) {
          case lBtnText:
            lBtnCallback(res);
            callback(res);
            break;

          case rBtnText:
            rBtnCallback(res);
            callback(res);
            break;
        }
      }
    });
  }

  /**

   * @param content (component) component
   * @param message (object)
   * @param opener (object)
   * @param callback (function) modal
   * @param callback (function)
   */
  open({ content, message = {}, opener = {}, modalClass = [], callback = (res: any) => {} }) {
    const dialog: DialogRef = this.dialogService.open({
      content
    });
    this.dialogRefList.push(dialog);
    console.log(this.dialogRefList);
    this.store.set(MODAL_STORE_KEY.MODAL_STORE_KEY, this.dialogRefList);
    this.i++;
    $('kendo-dialog').addClass(modalClass);
    $('body').addClass('overHidden');

    dialog.content.instance.modal = {
      message,
      callback,
      opener,
      close: (res: any) => {
        const modalStoreKey = this.store.get(MODAL_STORE_KEY.MODAL_STORE_KEY);
        modalStoreKey.splice(this.i - 1);
        dialog.close(res);
        $('body').removeClass('overHidden');
      }
    };

    dialog.result.subscribe((res) => {
      if (res instanceof DialogCloseResult) {
        callback(false);
      } else {
        callback(res);
      }
    });
  }

  // showNotificationService() {
  //   this.notificationService.show({
  //     content: 'Your data has been saved. Time for tea!',
  //     cssClass: 'button-notification',
  //     animation: { type: 'slide', duration: 400 },
  //     position: { horizontal: 'center', vertical: 'bottom' },
  //     type: { style: 'success', icon: true },
  //     closable: false
  //   });
  // }

  closeAllDialog() {
    const modalStore = this.store.get(MODAL_STORE_KEY.MODAL_STORE_KEY) as DialogRef[];
    if (modalStore) {
      if (modalStore.length > 0) {
        modalStore.forEach((element, index) => {
          modalStore[index].close(true);
        });
      }
    }
  }
}
