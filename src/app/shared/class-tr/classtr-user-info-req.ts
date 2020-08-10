import { Header } from '../class/class-header';

export class UserInfoRequest {
    header: Header;
    body: {
        userName: string;
    }
}