import { commonClass } from './class-commondto';
import { Gender } from '../constants/common.const';

export class User extends commonClass {
  id: number;
  firstName: string;
  lastName: string;
  birtDate: string;
  gender: Gender;
  age: number;
  imgId: number;
  email: string;
  phone: string;
  description: string;
}
