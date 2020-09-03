import { Header } from '../Class/class-header';

class Body {
  enabled: boolean;
  accountExpired: boolean;
  credentialsExpired: boolean;
  accountLocked: boolean;
  userName: string;
  id: number;
}

export class UserAccountRequest {

  public header = new Header();
  public body = new Body();
}
