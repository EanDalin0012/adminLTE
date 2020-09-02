import { Header } from '../Class/class-header';

class Body {
  isSuccessYN: string;
}

export class UserAccountRespnonse {
  public header = new Header();
  public body = new Body();
}
