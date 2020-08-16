import { Header } from '../class/class-header';
class Body{
    userName: string;
}
export class UserInfoRequest {
    header: Header;
    body = new Body();
}