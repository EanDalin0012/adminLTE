import { Gender } from '../constants/common.const';
export class UserInfo {
    id: number;
    account_expired: boolean;
    account_load: boolean;
    credentials_expired: boolean;
    enabled: boolean;
    user_name: string;
    resource_img_id: string;
}