import { Header } from '../Class/class-header';

class Body {
  enable: boolean;
  accountExpired: boolean;
  credentialsExpired: boolean;
  accountLock: boolean;
  userName: string;
  id: number;
}

export class UserAccountRequest {

  public header = new Header();
  public body = new Body();
}
