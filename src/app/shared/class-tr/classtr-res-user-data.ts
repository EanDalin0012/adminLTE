import { Header } from '../class/class-header';
import { UserInfo } from '../class/class-user-info';
class Body{
    
}
export class UserDataResponse {
    header: Header;
    body = {
        items:  new Array<UserInfo>()
    }
}