import { Gender } from '../constants/common.const';
import { commonClass } from './class-commondto';
export class UserInfo extends commonClass {
    id: number;
    account_expired: boolean;
    account_locked: boolean;
    credentials_expired: boolean;
    enabled: boolean;
    user_name: string;
    resource_img_id: string;
}