import { CurrencyCode } from './common.type';
export enum CHANNEL  {
  ADMIN= '01', //
  WEB= '02',
}

export enum SERVICE_STATUS_CODE {
    APPLY               = '000',			// Service Status Application
    NORMAL              = '001',			// Service Status Normal
    TERMINATE           = '009',		// Service Status Terminate
    BLOCKED_TRANSFER    = '100', // Service Status Blocked Transfer
}

export enum SUPPLYING_STATUS_CODE {
  ARRIVED             = '100',
  WILL_ARRIVE          = '101',
  OVER_DATE            = '110'
}

export enum LOAD_REPAYMENT_STATUS_CODE {
    PAID = '001',
    LATE = '002',
    NORMAL = '003',
}

export enum LANGUAGE {
    EN = '01',      // english
    KM = '02',      // khmer
    KO = '03',      // korean
    JA = '04',      // japanese
    ZH = '05',      // chines
    I18N_EN = 'en',
    I18N_KM = 'km',
    I18N_KO = 'ko',
    I18N_JA = 'ja',
    I18N_ZH = 'zh'
}

// TODO: auth.service will be update this code.
export enum AES_INFO {
    STORE = 'AES_INFO'
}

export enum BTN_ROLES {
    CLOSE     = 'CLOSE',
    EDIT      = 'EDIT',
    SAVE      = 'SAVE',
    DELETE    = 'DELETE',
    ACTIVE    = 'ACTIVE'

}

export enum LOCAL_STORAGE {
    DEVICE_INFO     = 'deviceInfo',
    CONTENTS_VERSION= 'contentsVersion',
    PRE_TRANSACTION = 'preTransaction',
    USER_INFO       = 'userInfo',
    IS_REMEMBER_ID  = 'isRememberId',
    USER_ID         = 'userID',
    LANGUAGE_CODE   = 'languageCode',
    I18N            = 'i18n',
    LAST_EVENT_TIME = 'lastEventTime',
    LAST_TIME_CHECK_NOTIFICATION = 'theLastTimeCheckNotification'
}

export enum BUTTON_ROLE {
    OK              = 'ok',
    CONFIRM         = 'confirm',
    CANCEL          = 'cancel',
    CLOSE           = 'close',
    NEXT            = 'next',
    PRE             = 'pre',
    APPLY           = 'apply',
    YES             = 'yes',
    NO              = 'no',
}

export enum KEY_CODE {
    ENTER = 13      // enter
}

export const ROWS_PER_PAGE = 20;
export const SUCCESS = 'Y';

export const LOGO_FILE_EXT = ['.jpg', '.png', '.jpeg', '.bmp'];

export enum PASSBOOK_EXIST_TYPE_CODE {
    PASSBOOK = '01',
    MOBILE = '02'
}

export enum DateTimeFormat {
    // 'dd/MMM/yyyy HH:mm:ss'
    hhmm = 'HH:mm' ,
    hhmmss =  'HH:mm:ss',
    yyyymmdd = 'yyyy.MM.dd', // Korean/Japan/china
    yyyymmddhhmm = 'yyyy.MM.dd HH:mm',
    yyyymmddhhmmss = 'yyyy.MM.dd HH:mm:ss',
    ddmmyyyy = 'dd/MMM/yyyy', // Cambodia / US
    ddmmyyyyhhmm = 'dd/MMM/yyyy HH:mm',
    ddmmyyyyhhmmss = 'dd/MMM/yyyy HH:mm:ss',
}

export enum DEPOSIT_INTEREST_PERIOD_DIVIDE_CODE {
    NA = '00',
    MONTH_1 = '01',
    MONTHS_3 = '03',
    MONTHS_6 = '06',
    MONTH_12 = '12'
}

export enum Gender {
  FEMALE = '01',
  MALE   = '02',
  OTHER  = '03'
}

export enum STATUS {
  ACTIVE    = '1',
  INACTIVE  = '2',
  MODIFY    = '3',
  REQUEST   = '4',
  CANCEL    = '5',
  DELETE    = '6',
  EXPIRED   = '7',
  UNACTIVE  = '8',
  RESTORE   = '9'

}

export enum URLCODE {
  'home'             = 100,
  'product'          = 3000,
  'company'          = 2000,
  'mainCategory'     = 7000,
  'subCategory'      = 8000,
  'import-product'   = 9100,
  'dash-board1000'   = 10000,
  'supplier'         = 11000,
  'init'             = 1,
  'list-import-product' = 9000
}

export enum CURRENCY_CODE {
  USD   = 'USD',
  KHR   = 'KHR'
}
export enum MODAL_STORE_KEY {
  MODAL_STORE_KEY = 'Modal_Store_object_dialog'
}
export enum EVENT_CODE {
  INPUT = 'input',
  FOCUS = 'focus',
  FOCUSOUT = 'focusout'
}

export const CURRENCY_CODE_LIST = [
  { currencyCode: 'USD'},
  { currencyCode: 'KHR'}
];
