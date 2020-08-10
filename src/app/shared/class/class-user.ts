import { commonClass } from './class-commondto';
import { Gender } from '../constants/common.const';

export class User extends commonClass {
  id: number;
  firstName: string;
  lastName: string;
  birtDate: string;
  gender: Gender;
  resourceInfoId: string;
  email: string;
  contact: string;
  description: string;
  password: string;
}
